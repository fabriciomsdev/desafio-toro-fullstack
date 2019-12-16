import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuotesService } from './quotes.service';
import { Quote } from './../models/quotes';
import { Account } from '../models/account';
import Swal from 'sweetalert2';
import { RestFullApiBaseService } from '../http/api-base.service';
import { Order } from '../models/order';
import { Wallet, Papper } from "../models/wallet";
import * as moment from 'moment';

@Component({
  selector: "trade",
  templateUrl: "./trade.component.html",
  styleUrls: ["./trade.component.scss"]
})
export class TradeComponent implements OnInit {
  quotes: Array<Quote> = [];
  ordersList = [];
  @Input() account: Account = new Account();
  @Output() afterOrderExecuted = new EventEmitter();

  constructor(
    public quotesService: QuotesService,
    public restFullApiService: RestFullApiBaseService
  ) {}

  calcQuoteAmountValue(quote: Quote, quantity: number) {
    return quote.getLastQuoteValue().value * quantity;
  }

  saveOrder(type: string, quote: Quote, quantity: number) {
    this.restFullApiService
      .setResource("orders")
      .post({
        sigla: quote.sigla,
        quantity: quantity,
        order_type: type,
        value: quote.lastValue * quantity
      })
      .subscribe((order: Order) => {
        this.account.wallet.addPapper(quote, order);
        this.afterOrderExecuted.next({
          type,
          quote,
          quantity
        });
      }, error => this.showMessageYouDontHaveBalance());
  }

  updateOrder(order: Order, quote: Quote) {
    this.restFullApiService
      .setResource("orders")
      .put(order, order.id)
      .subscribe((order: Order) => {
        this.account.wallet.removePapper(quote, order);
        
        this.afterOrderExecuted.next({
          type: "sell",
          quote: quote,
          quantity: order.quantity
        });
      });
  }

  beginSellOrderProccess(papper: Papper) {
    papper.order.order_type = 'sell';
    this.updateOrder(papper.order, papper.quote);
  }

  showMessageYouDontHaveBalance() {
    Swal.fire({
      title: "Ops ...",
      text: "Você não dinheiro o suficiente para executar essa ação",
      icon: "error"
    });
  }

  async beginBuyOrderProccess(quote: Quote, quantity = 0) {
    const { value: number } = await Swal.fire({
      title: `Compre ${quote.sigla}`,
      text: "Digite abaixo a quantidade que deseja",
      input: "number",
      inputPlaceholder: "0000",
      inputValue: String(quantity)
    });

    quantity = Number(number);

    if (quantity) {
      const amountValue = this.calcQuoteAmountValue(quote, quantity);
      
      if (this.account.canUserRemoveValueOfAccount(amountValue)) {
        this.saveOrder("bought", quote, quantity);
      } else {
        this.showMessageYouDontHaveBalance()
      }
    }
  }

  receiveQuotesChangeAndApplyUpdatesOnPappers(quotesUpdated, lastQuote){
    this.quotes = quotesUpdated;
    this.account.wallet.pappers.forEach(papper => {
      if (papper.quote.sigla == lastQuote.sigla) {
        papper.quote = lastQuote;
        this.account.wallet.calcBalance();
        papper.calcCurrentValue();
      }
    });
  }

  setupQuotesChangeObserver() {

    this.quotesService
      .whenQuotesChange((quotesUpdated, lastQuote) => {
        this.receiveQuotesChangeAndApplyUpdatesOnPappers(quotesUpdated, lastQuote)
      });
  }

  ngOnInit() {
    this.setupQuotesChangeObserver();
  }
}

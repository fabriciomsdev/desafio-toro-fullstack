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
  @Input() account: Account;
  @Output() afterOperationExecuted = new EventEmitter();

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
        order_type: type
      })
      .subscribe((order: Order) => {
        this.account.wallet.addPapper(quote, order);
        this.afterOperationExecuted.next({
          type,
          quote,
          quantity
        });
      });
  }

  updateOrder(order: Order, quote: Quote) {
    this.restFullApiService
      .setResource("orders")
      .put(order, order.id)
      .subscribe((order: Order) => {
        this.account.wallet.removePapper(quote, order);
        
        this.afterOperationExecuted.next({
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
        Swal.fire({
          title: "Ops ...",
          text: "Você não dinheiro o suficiente para executar essa ação",
          icon: "error"
        });
      }
    }
  }

  setupQuotesChangeObserver() {
    this.quotesService.whenQuotesChange((quotesUpdated, lastQuote) => {
      this.quotes = quotesUpdated;
      this.account.wallet.pappers.forEach(papper => {
        if (papper.quote.sigla == lastQuote.sigla) {
          papper.quote = lastQuote;
          papper.calcCurrentValue();
        }
      });
    });
  }

  ngOnInit() {
    this.setupQuotesChangeObserver();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { QuotesService } from './quotes.service';
import { Quote } from './../models/quotes';

@Component({
  selector: "trade",
  templateUrl: "./trade.component.html",
  styleUrls: ["./trade.component.scss"]
})
export class TradeComponent implements OnInit {
  quotes: Array<Quote> = [];
  ordersList = [];
  @Input() account;
  
  constructor(public quotesService: QuotesService) {}

  calcQuoteAmountValue(quote: Quote, quantity: number) {
    return quote.getLastQuoteValue().value * quantity;
  }

  async saveOrder(quote: Quote, quantity: number) {
    this.ordersList.push({
      quote,
      quantity
    });
  }

  async buyAnPapper(quote: Quote, quantity: number) {
    const amountValue = this.calcQuoteAmountValue(quote, quantity);
  }

  ngOnInit() {
    this.quotesService.listenQuotesChanges(
      quotesUpdated => (this.quotes = quotesUpdated)
    );
  }
}

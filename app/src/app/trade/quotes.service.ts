import { Injectable } from '@angular/core';

import { Quote } from './../models/quotes';

export class QuoteFactory {
  data;

  buildImageUrl(sigla) {
    return `https://static.guiainvest.com.br/Images/Ativo/${sigla}_120.gif`;
  }

  extractQuoteSigla() {
    return Object.keys(this.data)[0];
  }

  extractQuoteLastValue(): number {
    return Number(Object.values(this.data)[0]);
  }

  build(data) {
    let quote = new Quote();
    this.data = data;

    quote.sigla = this.extractQuoteSigla();
    quote.image = this.buildImageUrl(quote.sigla);
    quote.addValue({
      datetime: this.data.timestamp,
      value: this.extractQuoteLastValue()
    });

    return quote;
  }
}

export class QuotesObserver {
  socket = new WebSocket("ws://0.0.0.0:8080/quotes");

  listen(actionToDoOnQuotesChange) {
    this.socket.onmessage = actionToDoOnQuotesChange;
  }
}

@Injectable({
  providedIn: "root"
})
export class QuotesService {
  public quotes: Array<Quote> = [];
  public observer: QuotesObserver;
  public factory: QuoteFactory;
  public lastQuote: Quote;

  constructor() {
    this.observer = new QuotesObserver();
    this.factory = new QuoteFactory();
  }

  whenQuotesChange(callback?) {
    this.observer.listen(msg => {
      let newQuoteData = JSON.parse(msg.data);
      let isARegistredQuote = false;
      let isThereQuotesRegistred = this.quotes.length > 0;
      let newQuote = this.factory.build(newQuoteData);

      this.quotes.map(quote => {
        if (quote.sigla == newQuote.sigla) {
          quote.addValue(newQuote.getLastQuoteValue());

          newQuote = quote;
          isARegistredQuote = true;
        }
      });

      if (!isThereQuotesRegistred || !isARegistredQuote) {
        this.quotes.push(newQuote);
      }

      callback(this.quotes, newQuote);
    });
  }
}

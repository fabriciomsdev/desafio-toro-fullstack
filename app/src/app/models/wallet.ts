import { Order } from './order';
import { Quote } from './quotes';

export class Papper {
  order: Order;
  quote: Quote;
  currentValue: number;

  calcCurrentValue() {
    this.currentValue = this.order.quantity * this.quote.lastValue;
    return this.currentValue;
  }
}

export class Wallet {
  pappers: Array<Papper> = [];
  balance = 0;

  addPapper(quote: Quote, order: Order) {
    let papper = new Papper();

    papper.order = order;
    papper.quote = quote;

    papper.calcCurrentValue();

    this.pappers.push(papper);

    this.calcBalance();

    return this;
  }

  removePapper(quote: Quote, order: Order) {
    this.pappers = this.pappers.filter(
      papper =>
        papper.quote.sigla != quote.sigla && papper.order.quantity != order.quantity
    );

    this.calcBalance();

    return this;
  }

  calcBalance() {
    this.balance = 0;

    this.pappers.forEach(papper => this.balance += papper.calcCurrentValue());

    return this.balance;
  }
}

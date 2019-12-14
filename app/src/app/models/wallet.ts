import { Order } from './order';
import { Quote } from './quotes';

export class Papper {
  order: Order;
  quote: Quote;
  currentValue: number;

  calcCurrentValue() {
    this.currentValue = this.order.quantity * this.quote.lastValue;
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
  }

  removePapper(quote: Quote, order: Order) {
    this.pappers = this.pappers.filter(
      papper =>
        papper.quote.sigla != quote.sigla && papper.order.quantity != order.quantity
    );
  }
}

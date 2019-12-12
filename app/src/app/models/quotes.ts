import { User } from './user';

export class QuoteValue {
    datetime;
    value: number;

    constructor(datetime, value) {}
}

export class Quote {
    image: string;
    sigla: string;
    lastValuesList: Array<QuoteValue> = [];
    lastValue: number;
    user: User;

    addValue(data: QuoteValue) {
        this.lastValuesList.push(data);
        this.lastValue = this.getLastQuoteValue().value;

        return this;
    }

    getLastQuoteValue(): QuoteValue {
        return this.lastValuesList.reverse()[0];
    }
}

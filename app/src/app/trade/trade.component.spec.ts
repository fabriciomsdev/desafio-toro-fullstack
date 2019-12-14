import {
  async,
  ComponentFixture,
  TestBed,
  flush,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TradeComponent } from './trade.component';
import { QuoteFactory } from './quotes.service';
import { HttpClientModule } from '@angular/common/http';
import { Quote } from '../models/quotes';
import { Order } from '../models/order';
import { Wallet, Papper } from '../models/wallet';

describe('TradeComponent', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradeComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
    component.ngOnInit();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("test calcQuoteAmountValue method", () => {
    const factoryQuote = new QuoteFactory;
    const quotesData = { PETR4: "99.90", timestamp: "08-13-2019 00:00:00" };
    const quote = factoryQuote.build(quotesData);
    const quoteGroupValue = component.calcQuoteAmountValue(quote, 2);

    expect(quoteGroupValue == 2 * 99.9).toBeTruthy();    
  });

  it("test receiveQuotesChangeAndApplyUpdatesOnPappers()", () => {
    const factoryQuote = new QuoteFactory;
    const quotesData = { PETR4: "119.90", timestamp: "08-13-2019 00:00:00" };
    const quotesData2 = { TER4: "149.90", timestamp: "08-13-2019 00:00:00" };
    const quotes1DataUpdated = { PETR4: "199.90", timestamp: "08-14-2019 00:00:00" };
    const quote: Quote = factoryQuote.build(quotesData);
    const quote2: Quote = factoryQuote.build(quotesData2);
    const quote1Updated: Quote = factoryQuote.build(quotes1DataUpdated);
    const order: Order = new Order();
    order.quantity = 2;
    order.sigla = quote.sigla;

    component.account.wallet.addPapper(quote, order);

    component.receiveQuotesChangeAndApplyUpdatesOnPappers([quote, quote2], quote);

    expect(component.quotes.length).toBe(2);

    expect(component.quotes[0].sigla).toBe(quote.sigla);
    expect(component.quotes[0].lastValue).toBe(quote.lastValue);

    expect(component.quotes[1].sigla).toBe(quote2.sigla);
    expect(component.quotes[1].lastValue).toBe(quote2.lastValue);

    expect(component.account.wallet.pappers.length).toBe(1);

    component.receiveQuotesChangeAndApplyUpdatesOnPappers([quote1Updated, quote2], quote1Updated);
    
    expect(component.account.wallet.pappers[0].currentValue).toBe(199.90 * 2);
    expect(component.account.wallet.pappers[0].quote.sigla).toBe('PETR4');
  });  

  it("test Wallet Model", () => {
    const factoryQuote = new QuoteFactory;
    const quotesData = { PETR4: "119.90", timestamp: "08-13-2019 00:00:00" };
    const quote: Quote = factoryQuote.build(quotesData);
    const order: Order = new Order();
    const wallet: Wallet = new Wallet;
    order.quantity = 2;
    order.sigla = quote.sigla;
    const papper = new Papper();
    papper.order = order;
    papper.quote = quote;
    const balance = wallet.addPapper(quote, order).calcBalance();

    expect(wallet.pappers.length).toBe(1);
    expect(balance).toBe(wallet.balance);
    
    expect(balance).toBe(119.90 * 2);
    expect(papper.calcCurrentValue()).toBe(119.90 * 2);
    expect(papper.currentValue).toBe(119.90 * 2);

    const newBalance = wallet.removePapper(quote, order).calcBalance();

    expect(newBalance).toBe(0);
    expect(wallet.pappers.length).toBe(0);
  });  

  /*it("test calcQuoteAmountValue method", () => {
    const factoryQuote = new QuoteFactory();
    const quotesData = { PETR4: "99.90", timestamp: "08-13-2019 00:00:00" };
    const quote = factoryQuote.build(quotesData);
    component.saveOrder(quote, 2);
    const lastOrderWasAdded = component.ordersList.reverse()[0];

    expect(lastOrderWasAdded.quote.sigla == quote.sigla).toBeTruthy();
    expect(lastOrderWasAdded.quantity == 2).toBeTruthy();
  });*/

});

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

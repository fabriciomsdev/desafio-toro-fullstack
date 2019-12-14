import { TestBed } from '@angular/core/testing';

import { QuotesService, QuoteFactory } from './quotes.service';

describe('QuotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotesService = TestBed.get(QuotesService);
    expect(service).toBeTruthy();
  });

  it('test quotes factory is making right job', () => {
    const service: QuotesService = TestBed.get(QuotesService);
    const quotesData = { 'PETR4': '99.90', 'timestamp':"08-13-2019 00:00:00" }
    service.factory.data = quotesData;

    expect(
      service.factory.buildImageUrl("PETR4") ==
        `https://static.guiainvest.com.br/Images/Ativo/PETR4_120.gif`
    ).toBe(true);

    expect(service.factory.extractQuoteSigla() == "PETR4").toBe(true);
    expect(service.factory.extractQuoteLastValue() == 99.90).toBe(true);

    const quote = service.factory.build(quotesData);

    expect(quote.sigla == "PETR4").toBe(true);
    expect(quote.lastValuesList.reverse()[0].value == 99.9).toBe(true);
    expect(
      quote.lastValuesList.reverse()[0].datetime == "08-13-2019 00:00:00"
    ).toBe(true);
    expect(quote.lastValue == 99.9).toBe(true);
  })

  it("test if websocket connection on microservice quotes is working", (done: DoneFn) => {
    const service: QuotesService = TestBed.get(QuotesService);
    service.whenQuotesChange(quotes => {
      expect(service.quotes.length > 0).toBe(true);
      done();
    });
  });
});

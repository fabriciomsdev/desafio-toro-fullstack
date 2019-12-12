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

describe('TradeComponent', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradeComponent],
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

});

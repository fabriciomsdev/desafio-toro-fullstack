import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BankModule } from '../bank/bank.module';
import { TradeModule } from '../trade/trade.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        CommonModule,
        SharedModule,
        BankModule,
        TradeModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Test if initial balance is 0", () => {
    const fixture = TestBed.createComponent(AccountComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component.account.balance).toBe(0);
  });
});

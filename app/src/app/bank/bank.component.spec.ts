import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankComponent } from './bank.component';
import { MaterialModule } from '../shared/material/angular-material.module';

// left for brevity
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Account } from '../models/account';

describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BankComponent],
      imports:[HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.account = new Account()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bank component has the default params', () => {
    expect(component.account != null).toBe(true);
    expect(component.account.user != null).toBe(true);
    expect(component.account.balance == 0).toBe(true);
  })

  it('should has default methods for operate', () => {
    expect(component.canUserRemoveValueOfAccount != null).toBe(true);
    expect(component.makeAnAportOnAccount != null).toBe(true);
    expect(component.makeAnRemoveOnAccount != null).toBe(true);
  });

  it("should make add value in account balance", () => {
    const value = 50;
    component.account.clearValues();
    const oldDepositsLength = component.account.operations.deposits.length;
    component.makeAnAportOnAccount(value);

    expect(component.account.balance == 50).toBe(true);
    expect(
      component.account.operations.deposits.length == oldDepositsLength + 1
    ).toBe(true);
  });

  it("should make remove value in account balance", () => {
    component.account.clearValues();
    const value = 50;

    expect(component.account.balance == 0).toBe(true);

    component.makeAnAportOnAccount(value)
    expect(component.account.balance == 50).toBe(true);

    
    component.makeAnRemoveOnAccount(value);
    expect(component.account.balance == 0).toBe(true);
    expect(
      component.account.operations.deposits.length == 1
    ).toBe(true);
    expect(
      component.account.operations.draws.length == 1
    ).toBe(true);
  });

  it("should not lets user remove a value of account if account balance is less than value which removed", () => {
    const value = 50;
    component.account.clearValues();

    if (component.canUserRemoveValueOfAccount(value)) {
      component.makeAnRemoveOnAccount(value);
    }
    
    expect(component.account.balance == 0).toBe(true);
  });

});

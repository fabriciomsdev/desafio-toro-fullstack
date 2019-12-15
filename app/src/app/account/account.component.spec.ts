import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BankModule } from '../bank/bank.module';
import { TradeModule } from '../trade/trade.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Account, OrdersGroup, OperationsGroup } from '../models/account';
import { User } from '../models/user';
import { UserService } from '../login/auth.service';
import { RestFullApiBaseService } from '../http/api-base.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        CommonModule,
        SharedModule,
        BankModule,
        TradeModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Test if initial balance is 0", () => {
    const fixture = TestBed.createComponent(AccountComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component.account.balance).toBe(0);
  });

  it("Account Model Test", () => {
    const account = new Account();
    const operationsGroup = new OperationsGroup();
    operationsGroup.deposits = [
      {
        value: 100,
        operation_type: 'deposit',
        created_at: '12-02-2019 00:00:00',
        user: new User
      },
      {
        value: 200,
        operation_type: 'deposit',
        created_at: '12-02-2019 00:00:00',
        user: new User
      }
    ];

    expect(account.balance).toBe(0);
    expect(account.calculateBalance()).toBe(0);

    expect(account.setOperations(operationsGroup).balance).toBe(300);

    operationsGroup.draws = [
      {
        value: 100,
        operation_type: 'draw',
        created_at: '12-02-2019 00:00:00',
        user: new User
      },
      {
        value: 200,
        operation_type: 'draw',
        created_at: '12-02-2019 00:00:00',
        user: new User
      }
    ];

    expect(account.setOperations(operationsGroup).balance).toBe(0);

    expect(account.canUserRemoveValueOfAccount(300)).toBeFalsy();
    expect(account.operations.deposits.length).toBe(2);
    expect(account.operations.draws.length).toBe(2);
    expect(account.orders.boughts.length).toBe(0);
    expect(account.orders.sells.length).toBe(0);

    const ordersGroup = new OrdersGroup;

    ordersGroup.boughts = [
      {
        sigla: 'PETR4',
        quantity: 3,
        id: 1,
        order_type: 'sell'
      },
      {
        sigla: 'BID1',
        quantity: 100,
        id: 1,
        order_type: 'sell'
      }
    ]

    ordersGroup.sells = [
      {
        sigla: 'PETR4',
        quantity: 3,
        id: 1,
        order_type: 'bought'
      },
      {
        sigla: 'BID1',
        quantity: 100,
        id: 1,
        order_type: 'bought'
      }
    ]

    expect(account.setOrders(ordersGroup).orders.sells.length).toBe(2)
    expect(account.setOrders(ordersGroup).orders.boughts.length).toBe(2)

    account.updateWallet()
    
    account.wallet.pappers.forEach(papper => console.log(papper));
    console.log(account.wallet.pappers.length);
    expect(account.wallet.pappers.length).toBe(2);
  });

});

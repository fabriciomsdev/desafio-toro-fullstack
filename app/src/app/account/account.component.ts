import { Component, OnInit } from '@angular/core';
import { Account, OrdersGroup, OperationsGroup } from '../models/account';
import { RestFullApiBaseService } from '../http/api-base.service';
import { UserService } from '../login/auth.service';
import { User } from '../models/user';
import { Operation } from '../models/operations';
import { Order } from '../models/order';
import { Quote } from '../models/quotes';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  account = new Account();

  constructor(
    public restFullApiService: RestFullApiBaseService,
    public authService: UserService
  ) {}

  getAccountOperations() {
    this.restFullApiService
      .setResource("operations")
      .fetch()
      .subscribe((operations: OperationsGroup) => {
        this.account.setOperations(operations);
      });
  }

  getAccountOrders() {
    this.restFullApiService
      .setResource("orders")
      .fetch()
      .subscribe((orders: OrdersGroup) => {
        this.account.setOrders(orders);
      });
  }

  getAccountData() {
    if (this.authService.isAuth()) {
      this.restFullApiService
        .setResource("me")
        .fetch()
        .subscribe((currentUserLogged: User) => {
          this.account.user = currentUserLogged;
          this.getAccountOperations();
          this.getAccountOrders();
        });
    }
  }

  listenTrade($event) {
    this.getAccountOperations();
    this.getAccountOrders();
  }

  ngOnInit() {
    this.getAccountData();
  }
}

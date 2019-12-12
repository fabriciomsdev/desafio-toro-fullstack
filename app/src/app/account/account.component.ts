import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { RestFullApiBaseService } from '../http/api-base.service';
import { UserService } from '../login/auth.service';
import { User } from '../models/user';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  account = new Account();

  constructor(public restFullApiService: RestFullApiBaseService, public authService: UserService) {}

  ngOnInit() {
    console.log("this.authService.isAuth()", this.authService.isAuth());
    if (this.authService.isAuth()) {
      this.restFullApiService
          .setResource('me')
          .fetch()
          .subscribe((currentUserLogged: User) => {
            this.account.user = currentUserLogged;

            this.restFullApiService
              .setResource("operations")
              .fetch()
              .subscribe(operations => console.log(operations));

            this.restFullApiService
              .setResource("orders")
              .fetch()
              .subscribe(orders => console.log(orders));
          })
    }
  }
}

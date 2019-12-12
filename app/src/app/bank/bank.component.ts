import { Component, OnInit } from '@angular/core';
import { User } from './../models/user';

@Component({
  selector: "bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"]
})
export class BankComponent implements OnInit {
  accountData = {
    user: new User(),
    balance: 0
  };
  valueToAction = 0;
  errorMessages = {
    userHasNotSuficientMoney:
      "Você não tem dinheiro o suficiente para executar está ação!"
  };

  constructor() {}

  presentToast(message, color = "default", duration = 3000) {}

  makeAnAportOnAccount(value: number) {
    this.accountData.balance += value;
  }

  canUserRemoveValueOfAccount(value: number) {
    return this.accountData.balance >= value;
  }

  makeAnRemoveOnAccount(value: number) {
    if (this.canUserRemoveValueOfAccount(value)) {
      this.accountData.balance -= value;
    } else {
      this.presentToast(this.errorMessages.userHasNotSuficientMoney);
    }
  }

  ngOnInit() {}
}

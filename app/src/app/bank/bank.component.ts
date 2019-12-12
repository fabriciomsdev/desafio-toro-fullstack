import { Component, OnInit } from '@angular/core';
import { User } from './../models/user';
import Swal, { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: "bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"]
})
export class BankComponent implements OnInit {
  account = {
    user: new User(),
    balance: 0
  };
  valueToAction = 0;
  errorMessages = {
    userHasNotSuficientMoney:
      "Você não tem dinheiro o suficiente para executar está ação!"
  };

  constructor() {}

  presentAlert(alertDate: SweetAlertOptions) {
    Swal.fire(alertDate);
  }

  makeAnAportOnAccount(value: number) {
    this.account.balance += value;
  }

  canUserRemoveValueOfAccount(value: number) {
    return this.account.balance >= value;
  }

  makeAnRemoveOnAccount(value: number) {
    if (this.canUserRemoveValueOfAccount(value)) {
      this.account.balance -= value;
    } else {
      this.presentAlert({
        text: this.errorMessages.userHasNotSuficientMoney
      });
    }
  }

  makeAMoneyDraw() {}

  makeAMoneyDeposit() {}

  ngOnInit() {}
}

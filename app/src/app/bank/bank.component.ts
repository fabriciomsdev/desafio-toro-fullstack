import { Component, OnInit } from '@angular/core';
import { User } from './../models/user';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Transaction } from '../models/transactions';
import * as moment from 'moment';

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
  transactions: Array<Transaction> = [];

  constructor() {}

  presentAlert(alertDate: SweetAlertOptions) {
    Swal.fire(alertDate);
  }

  registerAnAport(value: number) {
    this.transactions.push({
      user: this.account.user,
      value: value,
      type: "deposit",
      created_at: moment.now()
    });
  }

  makeAnAportOnAccount(value: number) {
    this.account.balance += value;

    this.registerAnAport(value);
  }

  registerAnRemove(value: number) {
    this.transactions.push({
      user: this.account.user,
      value: value,
      type: "draw",
      created_at: moment.now()
    });
  }

  canUserRemoveValueOfAccount(value: number) {
    return this.account.balance >= value;
  }

  makeAnRemoveOnAccount(value: number) {
    if (this.canUserRemoveValueOfAccount(value)) {
      this.account.balance -= value;
      this.registerAnRemove(value);
    } else {
      this.presentAlert({
        text: this.errorMessages.userHasNotSuficientMoney,
        icon: "error"
      });
    }
  }

  async makeAMoneyDraw() {
    const { value: number } = await Swal.fire({
      title: "Faça uma retirada.",
      text: "Digite abaixo o valor que deseja retirar:",
      input: "number",
      inputPlaceholder: "00,00"
    });

    if (number) {
      this.makeAnRemoveOnAccount(Number(number));
    }
  }

  async makeAMoneyDeposit() {
    const { value: number } = await Swal.fire({
      title: "Faça um aporte.",
      text: "Digite abaixo o valor que deseja aportar:",
      input: "number",
      inputPlaceholder: "00,00"
    });

    if (number) {
      this.makeAnAportOnAccount(Number(number));
    }
  }

  ngOnInit() {}
}

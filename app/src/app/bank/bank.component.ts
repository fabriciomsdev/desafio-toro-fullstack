import { Component, OnInit, Input } from '@angular/core';
import { User } from './../models/user';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Operation } from '../models/operations';
import * as moment from 'moment';
import { Account } from '../models/account';
import { RestFullApiBaseService } from '../http/api-base.service';

@Component({
  selector: "bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"]
})
export class BankComponent implements OnInit {
  @Input() account = new Account();
  valueToAction = 0;
  errorMessages = {
    userHasNotSuficientMoney:
      "Você não tem dinheiro o suficiente para executar está ação!"
  };

  constructor(public restFullApiService: RestFullApiBaseService) {}

  presentAlert(alertDate: SweetAlertOptions) {
    Swal.fire(alertDate);
  }

  registerAnAport(value: number) {
    this.restFullApiService
      .setResource("operations")
      .post({
        value: value,
        operation_type: "deposit"
      })
      .subscribe((res: any) => {
        this.makeAnAportOnAccount(res.value);
      });
  }

  makeAnAportOnAccount(value: number) {
    this.account.operations.deposits.push({
      user: this.account.user,
      value: value,
      operation_type: "deposit",
      created_at: moment.now()
    });

    return this.account.calculateBalance();
  }

  makeAnRemoveOnAccount(value: number) {
    this.account.operations.draws.push({
      user: this.account.user,
      value: value,
      operation_type: "draw",
      created_at: moment.now()
    });

    return this.account.calculateBalance();
  }

  registerAnRemove(value: number) {
    this.restFullApiService
      .setResource("operations")
      .post({
        value: value,
        operation_type: "draw"
      })
      .subscribe((res: any) => {
        this.makeAnRemoveOnAccount(res.value);
      });
  }

  canUserRemoveValueOfAccount(value: number) {
    return this.account.balance >= value;
  }

  verifyAndmakeAnRemoveOnAccount(value: number) {
    if (this.canUserRemoveValueOfAccount(value)) {
      this.registerAnRemove(value);
    } else {
      this.presentAlert({
        text: this.errorMessages.userHasNotSuficientMoney,
        icon: "error"
      });
    }
  }

  async beginMakeAMoneyDraw() {
    const { value: number } = await Swal.fire({
      title: "Faça uma retirada.",
      text: "Digite abaixo o valor que deseja retirar:",
      input: "number",
      inputPlaceholder: "00,00"
    });

    let moneyValue = Number(number);

    if (moneyValue) {
      this.registerAnRemove(moneyValue);
    }
  }

  async beginMakeAMoneyDeposit() {
    const { value: number } = await Swal.fire({
      title: "Faça um aporte.",
      text: "Digite abaixo o valor que deseja aportar:",
      input: "number",
      inputPlaceholder: "00,00"
    });

    let moneyValue = Number(number);

    if (moneyValue) {
      this.registerAnAport(moneyValue);
    }
  }

  ngOnInit() {}
}

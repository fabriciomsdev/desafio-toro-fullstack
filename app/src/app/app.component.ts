import { Component } from '@angular/core';
import { User } from './models/user';
import { Account } from './models/account';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  account = new Account();
}

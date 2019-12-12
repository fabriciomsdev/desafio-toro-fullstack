import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import * as moment from "moment";

@Component({
  selector: "user-greeting",
  templateUrl: "./user-greeting.component.html",
  styleUrls: ["./user-greeting.component.scss"]
})
export class UserGreetingComponent implements OnInit {
  @Input() user: User;
  @Input() greetingPhrase: string;

  constructor() {}

  getGreetingTime(m) {
    var greetingTime = null; //return g

    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var splitAfternoon = 12; //24hr time to split the afternoon
    var splitEvening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      greetingTime = "Boa tarde";
    } else if (currentHour >= splitEvening) {
      greetingTime = "Boa noite";
    } else {
      greetingTime = "Bom dia";
    }

    return greetingTime;
  }

  ngOnInit() {
    if (!this.greetingPhrase) {
      this.greetingPhrase = this.getGreetingTime(moment());
    }

    if (this.user) {
      this.user.name = this.user.name.split(" ")[0];
    }
  }
}

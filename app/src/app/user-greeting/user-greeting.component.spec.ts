import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGreetingComponent } from './user-greeting.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import * as moment  from 'moment';
import { User } from '../models/user';

describe('UserGreetingComponent', () => {
  let component: UserGreetingComponent;
  let fixture: ComponentFixture<UserGreetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGreetingComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test greeting generate', () => {
    const day = "12-12-2019 {time}";
    const morning = moment(day.replace("{time}", "08:00:00"), "MM-DD-YYYY HH:mm:ss");
    const afternoon = moment(day.replace("{time}", "15:00:00"), "MM-DD-YYYY HH:mm:ss");
    const night = moment(day.replace("{time}", "20:00:00"), "MM-DD-YYYY HH:mm:ss");

    expect(component.getGreetingTime(morning) == 'Bom dia').toBeTruthy();
    expect(component.getGreetingTime(afternoon) == "Boa tarde").toBeTruthy();
    expect(component.getGreetingTime(night) == "Boa noite").toBeTruthy();
    expect(component.greetingPhrase == component.getGreetingTime(moment()));
  })

  it("test greeting name format", () => {
    component.user = new User();
    component.user.name = "Fabricio Magalhães";
    
    component.ngOnInit();

    expect(component.userName == "Fabricio").toBeTruthy();
  });
});

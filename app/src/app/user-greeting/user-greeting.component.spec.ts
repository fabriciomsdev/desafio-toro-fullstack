import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGreetingComponent } from './user-greeting.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";

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
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankComponent } from './bank.component';
import { MaterialModule } from '../shared/material/angular-material.module';

describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BankComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankComponent } from './bank.component';
import { MaterialModule } from '../shared/material/angular-material.module';
import { UserGreetingModule } from '../user-greeting/user-greeting.module';


@NgModule({
  declarations: [BankComponent],
  imports: [CommonModule, MaterialModule, UserGreetingModule],
  exports: [BankComponent]
})
export class BankModule {}

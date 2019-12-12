import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankComponent } from './bank.component';
import { MaterialModule } from '../shared/material/angular-material.module';


@NgModule({
  declarations: [BankComponent],
  imports: [CommonModule, MaterialModule],
  exports: [BankComponent]
})
export class BankModule {}

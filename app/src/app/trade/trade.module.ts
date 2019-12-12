import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeComponent } from './trade.component';
import { MaterialModule } from '../shared/material/angular-material.module';


@NgModule({
  declarations: [TradeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [TradeComponent]
})
export class TradeModule {}

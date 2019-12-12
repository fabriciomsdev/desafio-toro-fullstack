import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/angular-material.module';
import { BankModule } from '../bank/bank.module';
import { TradeModule } from '../trade/trade.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: AccountComponent,
    canActivate: [ 
      AuthGuardService
    ]
  }
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    SharedModule,
    BankModule,
    TradeModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccountComponent, RouterModule]
})
export class AccountModule {}

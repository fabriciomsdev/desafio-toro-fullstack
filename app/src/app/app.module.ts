import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/angular-material.module';
import { TradeModule } from './trade/trade.module';
import { BankModule } from './bank/bank.module';
import { UserGreetingComponent } from './user-greeting/user-greeting.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TradeModule,
    BankModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

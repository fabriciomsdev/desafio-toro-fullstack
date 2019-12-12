import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http"; 
import { MaterialModule } from './shared/material/angular-material.module';
import { TradeModule } from './trade/trade.module';
import { BankModule } from './bank/bank.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { AccountModule } from './account/account.module';
import { BasicHttpInterceptor } from './http/basic-http-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    TradeModule,
    BankModule,
    LoginModule,
    AccountModule,
    AppRoutingModule
  ],
  providers: [
    HttpClient,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

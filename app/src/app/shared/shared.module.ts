import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/angular-material.module";
import { UserService } from '../login/auth.service';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [MaterialModule, 
            HttpClientModule, 
            FormsModule],
  exports: [MaterialModule, 
            HttpClientModule, 
            FormsModule],
  providers: [HttpClient, UserService]
})
export class SharedModule {}

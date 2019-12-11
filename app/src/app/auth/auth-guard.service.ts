import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from '../login/auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: UserService, public router: Router) {}
  
  canActivate(): boolean {
    if (!this.auth.isAuth()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}

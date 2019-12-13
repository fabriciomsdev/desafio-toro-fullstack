import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(protected http: HttpClient, protected router: Router) {}

  getApiUrlResource(resource) {
    return environment.baseURLRequest + environment.apiRoutes[resource];
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token) {
    localStorage.setItem("token", token);
    return this;
  }

  isAuth() {
    return this.getToken() != null;
  }

  deleteToken() {
    localStorage.removeItem("token");
    return this;
  }

  logout() {
    this.deleteToken();
    this.router.navigate(['/login']);
  }

  tryLogin(data) {
    const url = this.getApiUrlResource("login");
    return this.http.post(url, data);
  }

  tryRegister(data) {
    const url = this.getApiUrlResource("register");
    return this.http.post(url, data);
  }
}

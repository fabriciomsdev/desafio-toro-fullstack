import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  showSpinner = false;
  userNotHasAccount = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public authService: UserService,
    protected router: Router
  ) {}

  makeRegister() {
    if (this.userForm.invalid) {
      return Swal.fire({
        icon: "error",
        title: "Ops ...",
        text: "Por favor digite seu email e senha."
      });
    }

    this.showSpinner = true;

    this.authService.tryRegister(this.userForm.value).subscribe(
      user => {
        this.makeLogin();
      },
      errors => {
        Swal.fire({
          icon: "error",
          title: "Ops ...",
          text: "Este email já foi cadastrado, por favor tente com outro."
        });
      }
    );
  }

  makeLogin() {
    if (this.userForm.invalid) {
      return Swal.fire({
        icon: "error",
        title: "Ops ...",
        text: "Por favor digite seu email e senha."
      });
    }

    this.showSpinner = true;

    this.authService.tryLogin(this.userForm.value).subscribe(
      tokens => {
        this.authService.setToken(tokens["access"]);
        this.router.navigateByUrl("");
        this.showSpinner = false;
      },
      error => {
        Swal.fire({
          icon: "error",
          title: "Ops ...",
          text: "Email ou senha inválidos"
        });

        this.showSpinner = false;
      }
    );
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      name: [""],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }
}

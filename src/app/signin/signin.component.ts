import { Component, OnInit } from '@angular/core';
import { AuthAppService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'angular2-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public user;
  sub: any;

  constructor(
    private AuthServiceApp: AuthAppService,
    private AuthServiceSocial: AuthService
  ) { }

  ngOnInit() {
  }

  
  onSignin(form: NgForm) {
    this.AuthServiceApp.signin(form.value.email, form.value.password).
      subscribe(
      tokenData => console.log(tokenData),
      error => console.log(error),
    );
  }


  socialSignin(provider) {
    this.sub = this.AuthServiceSocial.login(provider).subscribe(
      (data) => {
        console.log(data);
        this.user = data;


        this.AuthServiceApp.signup(this.user.name, this.user.email, this.user.uid).
          subscribe(
          response => console.log(response),
          error => console.log(error),
        );

      }
    )
  }


}

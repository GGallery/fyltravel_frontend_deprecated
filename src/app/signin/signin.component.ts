import { Component, OnInit } from '@angular/core';
import { AuthAppService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'angular2-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public user;
  sub: any;

  constructor(
    private AuthAppService: AuthAppService,
    private AuthServiceSocial: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  EmailPassSignIn(form: NgForm) {
    this.signIn(form.value.email, form.value.password);
  }

  SocialSignin(provider) {
    this.sub = this.AuthServiceSocial.login(provider).subscribe(
      (data) => {
        console.log(data);
        this.user = data;

        this.signIn(this.user.email, this.user.uid);
      }
    );
  }


  signIn(email: string, password: string) {
    this.AuthAppService.signin(email, password).
      subscribe(
      tokenData => {
          this.router.navigate(['/user/' + tokenData.user.uid ]);
      },
      error => console.log(error),
    );
  }




}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { AuthService } from "angular2-social-login";
import { AuthAppService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user;
  sub: any;

  constructor(
    private AuthServiceApp: AuthAppService,
    private AuthServiceSocial: AuthService

  ) {
  }

  ngOnInit() {
  }


  onSignup(form: NgForm) {
    this.AuthServiceApp.signup(form.value.username, form.value.email, form.value.password).
      subscribe(
      response => console.log(response),
      error => console.log(error),
    );
  }


  socialSignup(provider) {
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

  logout() {
    this.AuthServiceSocial.logout().subscribe(
      (data) => {//return a boolean value.
        console.log(data);
      }
    )
  }



  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../services/auth.service';

import { AuthService } from "angular2-social-login";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

public user;
sub: any;

  constructor(
    private authService: AuthService, 
    private _auth:AuthService

  ) {
  }

  ngOnInit() {
  }


  onSignup(form: NgForm) {
    // this.authService.signup(form.value.username, form.value.email, form.value.password).
    //   subscribe(
    //   response => console.log(response),
    //   error => console.log(error),
    // );
  }


  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  //user data 
                  //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google) 
                }
    )
  }
 
  logout(){
    this._auth.logout().subscribe(
      (data)=>{//return a boolean value.
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

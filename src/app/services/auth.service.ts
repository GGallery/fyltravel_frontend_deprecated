import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthAppService {


  public user: any;
  public currentToken: string;
  public userAuthenticated: boolean = false;
  private api = environment.apiUrl;

  constructor(
    private http: Http,
    private router : Router
  
  ) { }

  signup(username: string, email: string, password: string) {
    return this.http.post(this.api + 'signup',
      { name: username, email: email, password: password },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
  }

  signin(email: string, password: string) {
    return this.http.post(this.api + 'signin',
      { email: email, password: password },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
      (response: Response) => {
        const token = response.json().token;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        this.user = "TestTony";
        return { token: token, decoded: JSON.parse(window.atob(base64)) };
      }
      )
      .do(
      tokenData => {
        this.currentToken = tokenData.token;
        this.userAuthenticated = true;

        localStorage.setItem('token', tokenData.token)
      }
      )
  }

  init() {
    this.currentToken = localStorage.getItem('token');
    console.log(this.currentToken);
    if (this.currentToken) {
      this.userAuthenticated = true;
      console.log(this.userAuthenticated);
    }
  }

  logout(){
    // if(localStorage.removeItem('token'))
    //  this.router.navigate(['/'])
    
  }


  isAuthenticated() {
    return this.userAuthenticated;
  }

}


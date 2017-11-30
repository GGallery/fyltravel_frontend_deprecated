import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/LocalStorageEmitter';

import { Observable } from 'rxjs/Observable';
// import { tokenNotExpired } from 'angular2-jwt-session';


import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthAppService {


  public user: any;
  public user_id: number;
  public currentToken: string;
  public userAuthenticated  = false;
  private api = environment.apiUrl;

  constructor(
    private http: Http,
    private router: Router

  ) { }

  signup(username: string, email: string, password: string) {
    return this.http.post(this.api + 'signup',
      { name: username, email: email, password: password },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) });
  }

  signin(email: string, password: string) {
    return this.http.post(this.api + 'signin',
      { email: email, password: password },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
        (response: Response) => {
          console.log(response);
          const token = response.json().token;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          const user = response.json().user;

          return { token: token, user: user, decoded: JSON.parse(window.atob(base64)) };
        }
      )
      .do(
        tokenData => {
          this.currentToken = tokenData.token;
          this.userAuthenticated = true;
          this.user_id = tokenData.user.id;

          localStorage.setItem('userid', tokenData.user.id);
          localStorage.setItem('token', tokenData.token);
        }
      );
  }

  init() {
    this.currentToken = localStorage.getItem('token');
    this.user_id = Number(localStorage.getItem('userid'));

    if (this.currentToken) {
      this.userAuthenticated = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userAuthenticated = false;
    this.currentToken = null;
    this.user_id = null;
    this.router.navigate(['/']);

  }


  isAuthenticated() {

    // console.log(tokenNotExpired());

    return this.userAuthenticated;
  }

  currentUserId() {
    return this.user_id;
  }


}


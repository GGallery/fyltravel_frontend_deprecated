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


  public uid: string;
  public userid: number;
  public username: string;
  public userimage: string;

  public currentToken: string;
  public userAuthenticated  = false;
  private api = environment.apiUrl;

  constructor(
    private http: Http,
    private router: Router

  ) { }

  signup(username: string, email: string, password: string, provider: string, image: string) {
    console.log(username, email, password, provider, image );
    return this.http.post(this.api + 'signup',
      { name: username, email: email, password: password, provider: provider, image: image },
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
          console.log(user);

          return { token: token, user: user, decoded: JSON.parse(window.atob(base64)) };
        }
      )
      .do(
        tokenData => {
          this.currentToken = tokenData.token;
          this.userAuthenticated = true;
          this.uid = tokenData.user.uid;
          this.userid = tokenData.user.id;
          this.username = tokenData.user.username;
          this.userimage = tokenData.user.image;


          localStorage.setItem('uid', tokenData.user.uid)
          localStorage.setItem('userid', tokenData.user.id);
          localStorage.setItem('username', tokenData.user.username);
          localStorage.setItem('userimage', tokenData.user.image);
          localStorage.setItem('token', tokenData.token);
        }
      );
  }

  init() {
    this.currentToken = localStorage.getItem('token');
    this.uid = localStorage.getItem('uid');
    this.userid = Number(localStorage.getItem('userid'));
    this.username = localStorage.getItem('username');
    this.userimage = localStorage.getItem('userimage');

    if (this.currentToken) {
      this.checkToken(this.currentToken).subscribe(
        data => this.userAuthenticated = true,
        error => this.dologin()
      );
    }
  }

  cleanData() {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('userimage');

    this.userAuthenticated = false;
    this.currentToken = null;
    this.uid = null;

  }


  logout() {
    this.cleanData();
    this.router.navigate(['/']);
  }

  dologin() {
    this.cleanData();
    this.router.navigate(['/signin']);
  }

  checkToken(token): Observable<boolean> {
    const url = this.api + 'checkToken?token=' + token;
    return this.http.get(url)
      .catch(this.handleError);
  }



  isAuthenticated() {
    return this.userAuthenticated;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error;
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    console.log('forse token scaduto? ');

    return Observable.throw(errMsg);
  }



}


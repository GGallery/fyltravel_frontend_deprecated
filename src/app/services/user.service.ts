import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthAppService } from './auth.service';

import 'rxjs/Rx';
import {IUser} from '../model/IUser';


@Injectable()
export class UserService {

  private api = environment.apiUrl;

  constructor(
    private _http: Http ,
    private AuthAppService: AuthAppService
  ) { }

  // get_CountTravel(): Observable<number> {
  //   const url = this.api + 'get_CountTravel?token=' + this.AuthAppService.currentToken;
  //   return this._http.get(url)
  //     .map(res => res.json())
  //     .catch(this.handleError);
  // }

  get_CountTravel(uid):  Observable<number> {
    console.log('get_CountTravel' + uid + this.AuthAppService.currentToken);
    return this._http.post(this.api + 'get_CountTravel?token=' + this.AuthAppService.currentToken,
      {uid: uid},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  get_UserInfo(uid):  Observable<any> {
    console.log('get_UserInfo' + uid + this.AuthAppService.currentToken);
    return this._http.post(this.api + 'get_UserInfo?token=' + this.AuthAppService.currentToken,
      {uid: uid},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateUser(user: IUser):  Observable<any> {
    return this._http.post(this.api + 'updateUser?token=' + this.AuthAppService.currentToken, user,

      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) }
      )
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    console.log('forse token scaduto? ');

    return Observable.throw(errMsg);
  }

}

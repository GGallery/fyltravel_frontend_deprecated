import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthAppService } from './auth.service';

import 'rxjs/Rx';


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

  get_CountTravel():  Observable<number> {
    return this._http.post(this.api + 'get_CountTravel?token=' + this.AuthAppService.currentToken,
      {id: 10},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  get_UserInfo():  Observable<number> {
    return this._http.post(this.api + 'get_UserInfo?token=' + this.AuthAppService.currentToken,
      {id: 10},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
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

import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Travel } from '../travel/travel';
import { environment } from '../../environments/environment';
import { AuthAppService } from './auth.service';


@Injectable()
export class TravelService {

  private api = environment.apiUrl;

  constructor(
    private _http: Http, 
    private AuthAppService: AuthAppService
  ) { }

  getTravels(): Observable<any[]> {
    let url = this.api + 'travels?token='+ this.AuthAppService.currentToken;
    return this._http.get(url)
      .map(res => res.json())
      .catch(this.handleError)
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
    return Observable.throw(errMsg);
  }

}
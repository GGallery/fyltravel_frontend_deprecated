import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Travel } from '../travel/travel';


@Injectable()
export class TravelService {

  constructor(private _http: Http) { }



  getTravels(): Observable<any[]> {
    let url = 'http://localhost:8000/api/travels';
    return this._http.get(url)
      .map(res => res.json())
      .catch(this.handleError)
  }





  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
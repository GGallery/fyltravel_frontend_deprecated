import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthAppService } from './auth.service';
import {NgForm} from '@angular/forms';
import 'rxjs/Rx';


@Injectable()
export class TravelService {

  private api = environment.apiUrl;

  constructor(
    private _http: Http ,
    private AuthAppService: AuthAppService
  ) { }

   getUserTravels(uid: string):  Observable<any> {
    return this._http.post(this.api + 'userTravels?token=' + this.AuthAppService.currentToken,
      {uid:  uid},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  newTravel(title: string):  Observable<number> {
    return this._http.post(this.api + 'newtravel?token=' + this.AuthAppService.currentToken,
      {title: title},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }


  getTravel(travel_id: number ):  Observable<any> {
    return this._http.post(this.api + 'get_travel?token=' + this.AuthAppService.currentToken,
      {travel_id:  travel_id},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getBestTravels(uid):  Observable<any> {
    return this._http.post(this.api + 'get_best_travel?token=' + this.AuthAppService.currentToken,
      {uid:  uid, amount: 5},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getTappe(travel_id: number ):  Observable<any> {
    return this._http.post(this.api + 'get_tappe?token=' + this.AuthAppService.currentToken,
      {travel_id:  travel_id},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  setTappe(travel_id: number, tappe: any[] ):  Observable<any> {
    return this._http.post(this.api + 'set_tappe?token=' + this.AuthAppService.currentToken,
      {travel_id:  travel_id, tappe: tappe},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  getImages(travel_id: number ) {
    return this._http.post(this.api + 'get_images?token=' + this.AuthAppService.currentToken,
      {travel_id:  travel_id},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
        (response: Response) => {
          const data = response.json();
          for ( const image of data ){
            image.small = environment.travelImagePath + 'small/' + image.filename;
            image.medium = environment.travelImagePath + 'medium/' + image.filename;
            image.big = environment.travelImagePath + 'big/' + image.filename;
          }
          return data;
        }
      )
      .catch(this.handleError);
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

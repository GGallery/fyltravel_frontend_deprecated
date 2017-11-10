import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthAppService } from './auth.service';
import {NgForm} from '@angular/forms';


@Injectable()
export class TravelService {

  private api = environment.apiUrl;

  constructor(
    private _http: Http ,
    private AuthAppService: AuthAppService
  ) { }

  getTravels(): Observable<any[]> {
    const url = this.api + 'travels?token=' + this.AuthAppService.currentToken;
    return this._http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }



  getUserTravels(): Observable<any[]> {
    const url = this.api + 'userTravels?token=' + this.AuthAppService.currentToken;
    return this._http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  newTravel(form: NgForm):  Observable<any> {

    return this._http.post(this.api + 'newtravel?token=' + this.AuthAppService.currentToken,
      {title: form.value.title, description: form.value.description},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }


  updateTravelImage(travel_id: number, image: string):  Observable<any> {
    return this._http.post(this.api + 'updatetravelimage?token=' + this.AuthAppService.currentToken,
      {travel_id:  travel_id, image: image},
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

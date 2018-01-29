import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthAppService } from './auth.service';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';



@Injectable()
export class TravelService {

  private api = environment.apiUrl;

  public baseUrl = 'https://api.cdnjs.com/libraries';
  public queryUrl = '?search=';

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

  getUserItinerari(uid: string):  Observable<any> {
    return this._http.post(this.api + 'userItinerari?token=' + this.AuthAppService.currentToken,
      {uid:  uid},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  newTravel(title: string ):  Observable<number> {
    return this._http.post(this.api + 'newtravel?token=' + this.AuthAppService.currentToken,
      {title: title },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateTravel(
    id: number,
    title: string,
    description: string,
    shortdescription: string,
    hashtag: string,
    rate: number,
    publish: number,
    scopi: number[],
    keywords: number[],
    consigliatoa: number[]
  ):  any {
    return this._http.post(this.api + 'updatetravel?token=' + this.AuthAppService.currentToken,
      {
        id: id,
        title: title,
        description: description,
        shortdescription: shortdescription,
        hashtag: hashtag,
        rate: rate,
        publish: publish,
        scopi: scopi,
        keywords: keywords,
        consigliatoa: consigliatoa
      },
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


  getLatestTravels():  Observable<any> {
    return this._http.post(this.api + 'get_latest_travel?token=' + this.AuthAppService.currentToken,
      {amount: 6},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(res => res.json())
      .catch(this.handleError);
  }


  getStarredTravels(amount: number):  Observable<any> {
    return this._http.post(this.api + 'get_starred_travel?token=' + this.AuthAppService.currentToken,
      {amount: amount},
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

  getScopi( ) {
    return this._http.post(this.api + 'get_scopi?token=' + this.AuthAppService.currentToken,
      { },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
        (response: Response) => {
          const data = response.json();
          for ( const obj of data ){
            obj.stato = false;
          }
          return data;
        }
      )
      .catch(this.handleError);
  }

  getKeywords( ) {
    return this._http.post(this.api + 'get_keywords?token=' + this.AuthAppService.currentToken,
      { },
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
        (response: Response) => {
          const data = response.json();
          for ( const obj of data ){
            obj.stato = false;
          }
          return data;
        }
      )
      .catch(this.handleError);
  }

  getConsigliatoa( ) {
    return this._http.post(this.api + 'get_consigliatoa?token=' + this.AuthAppService.currentToken,
      {},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
        (response: Response) => {
          const data = response.json();
          for ( const obj of data ){
            obj.stato = false;
          }
          return data;
        }
      )
      .catch(this.handleError);
  }



  public search(terms: Observable<string>) {
    return terms.debounceTime(0)
      .distinctUntilChanged()
      .switchMap(
        term => this.searchEntries(term));
  }

  public searchEntries(term) {


    return this._http.post(this.api + 'search?token=' + this.AuthAppService.currentToken,
      { search: term},
      { headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
      .map(
        (response: Response) => {
          const data = response.json();
          for ( const obj of data ){
            obj.stato = false;
          }
          return data;
        }
      );

    // return this.http
    //   .get(this.baseUrl + this.queryUrl + term)
    //   .map(res => res.json());
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

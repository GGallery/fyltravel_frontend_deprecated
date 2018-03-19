import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { } from 'googlemaps';
import {TravelService} from '../services/travel.service';
import {environment} from '../../environments/environment';

import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Travel } from '../model/travel';
import {forEach} from '@angular/router/src/utils/collection';
import {IUser} from '../model/IUser';
import {IPosition} from '../model/IPosition';

@Component({
  selector: 'app-usermap',
  templateUrl: './usermap.component.html',
  styleUrls: ['./usermap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsermapComponent implements OnInit {


  public currentTravel;
  public currentTappa;

  public travels;
  public latitude: number ;
  public longitude: number ;
  public zoom: number ;

  public mapWidth: string;

  public mappa: any;


  public userViveA: any;

  private errMesg: any;
  public travelCoverPath = environment.travelCoverPath;

  @Input() user: IUser;


  constructor(
    private travelService: TravelService,
  ) { }


  ngOnInit() {

    this.travels = [];
    this.zoom = 2;
    this.latitude = 45.4642035;
    this.longitude = 9.186515999999983;

    this.mapWidth = 'col-md-12';

    this.userViveA = JSON.parse(this.user.viveageolocation);

    this.getUserTravels();

  }

  public getUserTravels() {
    this.travelService.getUserTravels(this.user.uid.toString())
      .subscribe(
        (result) => {
          this.travels = result;
          console.log(this.travels);
        },
        error => this.errMesg = <any>error
      );
  }
  clickedMarker(travel: any, tappa: any) {
    this.currentTravel = travel;
    this.currentTappa = tappa;
    this.mapWidth = 'col-md-8';
    console.log(travel);

    this.latitude = travel.latitude;
    this.longitude = travel.longitude;

  }

  closeCurrentTravel() {
    this.currentTravel = null;
    this.mapWidth = 'col-md-12';
    console.log(this.currentTravel);
  }
}

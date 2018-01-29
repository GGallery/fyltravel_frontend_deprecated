import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { } from 'googlemaps';
import {TravelService} from '../services/travel.service';
import {environment} from '../../environments/environment';

import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Travel } from '../model/travel';
import {forEach} from '@angular/router/src/utils/collection';

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


  private errMesg: any;
  public travelCoverPath = environment.travelCoverPath;

  @Input() uid: string;

  constructor(
    private travelService: TravelService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {

    this.travels = [];
    this.zoom = 2;
    this.latitude = 45.4642035;
    this.longitude = 9.186515999999983;

    this.mapWidth = 'col-md-12';
    this.getUserTravels(this.uid);

  }

  public getUserTravels(uid: string) {
    this.travelService.getUserTravels(uid)
      .subscribe(
        (result) => {
          const travels = result;
          this.travels = travels;
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

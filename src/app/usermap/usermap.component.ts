import { Component, OnInit, ViewEncapsulation} from '@angular/core';
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

  private errMesg: any;
  public travelCoverPath = environment.travelCoverPath;



  constructor(
    private travelService: TravelService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {

    this.travels = [];
    this.zoom = 2;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.getUserTravels();

  }

  public getUserTravels() {
    this.travelService.getUserTravels()
      .subscribe(
        (result) => {
          this.travels = result,
            console.log(result);
        },
        error => this.errMesg = <any>error
      );
  }
  clickedMarker(travel: any, tappa: any) {
    this.currentTravel = travel;
    this.currentTappa = tappa;


    this.latitude = travel.latitude;
    this.longitude = travel.longitude;

  }



}

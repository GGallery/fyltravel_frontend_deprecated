import { Component, OnInit } from '@angular/core';

import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { TravelService } from '../services/travel.service';
import { Travel } from '../model/travel';
import {environment} from "../../environments/environment";
import {forEach} from "@angular/router/src/utils/collection";




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  private errMesg: any;

  public positions;
  public currentTravel;
  public searchElementRef: ElementRef;
  private infowindow: any;
  public travels;

  // public tutteletappe: any[];

  public travelImagePath = environment.travelImagePath;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private travelService: TravelService


  ) { }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 2;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.travels = [];

    this.getUserTravels();
  }


  clickedMarker(travel: any) {
    this.currentTravel = travel;


  }

  showInfo(event: any, travel: any  ) {
    console.log(event);
    console.log(travel);
// travel.infoWindow.open();


    // this.infowindow.latLng = event.coords;
    // // this.infowindow.longitude = event.longitude;
    // this.infowindow.open();
  }


  public getUserTravels() {
    this.travelService.getUserTravels()
      .subscribe(
        travels => {
          this.travels = travels,
          console.log(travels);
        },
        error => this.errMesg = <any>error
      );
  }



}


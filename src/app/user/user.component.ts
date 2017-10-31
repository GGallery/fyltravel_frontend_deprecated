import { Component, OnInit } from '@angular/core';

import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { TravelService } from '../services/travel.service';
import { Travel } from '../travel/travel';


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

    this.positions = [{

    }];

    this.getTravel();

    // load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    // });
  }


  clickedMarker(travel: any) {
    this.currentTravel = travel;
  }


  private getTravel() {
    this.travelService.getTravels()
      .subscribe(
        travels => {
          this.positions = travels,
            console.log(travels);
        },
        error => this.errMesg = <any>error
      );
  }


}


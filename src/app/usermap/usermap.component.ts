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
import {IItinerario} from '../model/IItinerario';
import {ITravel} from '../model/ITravel';

@Component({
  selector: 'app-usermap',
  templateUrl: './usermap.component.html',
  styleUrls: ['./usermap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsermapComponent implements OnInit {


  @Input() travels: ITravel[];
  @Input() itinerari: IItinerario[];
  @Input() user: IUser;

  public userViveA: any;
  public polilyne: ITravel[] = [];

  public currentTravel;
  public currentTappa;
  public latitude: number ;

  public longitude: number ;
  public zoom: number ;

  public mapWidth: string;

  public mappa: any;
  private errMesg: any;

  public travelCoverPath = environment.travelCoverPath;

  constructor(

  ) { }


  ngOnInit() {

    console.log('MapTRavel', this.travels);
    console.log('MapItinerari', this.itinerari);



    this.itinerari.forEach(itinerario => {
      this.travels = [...this.travels, ...itinerario.travels];
      this.polilyne = [...this.polilyne, ...itinerario.travels];
    });

    console.log(this.polilyne);

    this.zoom = 2;
    this.latitude = 45.4642035;
    this.longitude = 9.186515999999983;

    this.mapWidth = 'col-md-12';

    this.userViveA = JSON.parse(this.user.viveageolocation);

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

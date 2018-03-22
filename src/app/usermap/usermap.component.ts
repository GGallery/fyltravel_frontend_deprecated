import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../environments/environment';
import {IUser} from '../model/IUser';
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

  public currentTravel;
  public currentTappa;
  public latitude: number ;
  public longitude: number ;
  public zoom: number ;

  public mapWidth: string;

  public mappa: any;

  public travelCoverPath = environment.travelCoverPath;

  constructor() { }

  ngOnInit() {
    this.itinerari.forEach(itinerario => {
      this.travels = [...this.travels, ...itinerario.travels];
    });

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
    this.latitude = travel.latitude;
    this.longitude = travel.longitude;
    console.log(this.mapWidth);
  }

  closeCurrentTravel() {
    this.currentTravel = null;
    this.mapWidth = 'col-md-12';
    console.log(this.mapWidth);
  }
}

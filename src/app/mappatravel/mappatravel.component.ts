import { NgZone, OnInit, Component, Input } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {TravelService} from '../services/travel.service';
import {ITravel} from '../model/ITravel';

@Component({
  selector: 'app-mappatravel',
  templateUrl: './mappatravel.component.html',
  styleUrls: ['./mappatravel.component.css']
})

export class MappatravelComponent implements OnInit {

  public zoom: number;
  public mappa: any;

  @Input() travel: ITravel;

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) {}

  ngOnInit() {

    this.zoom = 2;
    this.mapsAPILoader.load();
  }
}

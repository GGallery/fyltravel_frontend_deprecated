import {Component, Input, OnInit} from '@angular/core';
import { TravelService } from '../services/travel.service';
import { AuthAppService } from '../services/auth.service';
import {environment} from '../../environments/environment';
import {ITravel} from '../model/ITravel';
import {IItinerario} from '../model/IItinerario';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  @Input() travels: ITravel[];
  @Input() itinerari: IItinerario[];

  public itinerarioCoverPath = environment.itinerarioCoverPath;
  public customIconPath = environment.customIconPath;

  constructor() {
  }

  ngOnInit() {
  }
}

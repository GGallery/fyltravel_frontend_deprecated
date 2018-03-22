import { Component, OnInit, Input } from '@angular/core';
import {ITravel} from '../model/ITravel';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-travel-list-item',
  templateUrl: './travel-list-item.component.html',
  styleUrls: ['./travel-list-item.component.css'],

})
export class TravelListItemComponent implements OnInit {


  @Input() travel: ITravel;
  @Input() child: boolean;

  public travelCoverPath = environment.travelCoverPath + 'big/';
  public customIconPath = environment.customIconPath


  constructor() {
  }

  ngOnInit() {
  }
}

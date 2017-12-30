import { Component, OnInit, Input } from '@angular/core';

import {TravelService} from '../services/travel.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

  private errMesg: string;
  public travelCoverPath = environment.travelCoverPath;
  public customIconPath = environment.customIconPath

  public loading= true;

  public travels: object;

  constructor(
    private travelService: TravelService,
  ) {
    this.travels = [];
    this.errMesg;

  }

  ngOnInit() {
    this.getLatestTravels();
  }


  getLatestTravels() {
    this.travelService.getLatestTravels()
      .subscribe(
        (result) => {
          console.log('latest'  + result);
          this.travels = result;
        },
        error => this.errMesg = <any>error
      );
  }
}

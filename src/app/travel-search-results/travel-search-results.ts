import {Component, Input, OnInit} from '@angular/core';
import { TravelService } from '../services/travel.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-travel-search-results',
  templateUrl: './travel-search-results.html',
  styleUrls: ['./travel-search-results.css']
})
export class TravelSearchResultsComponent implements OnInit {

  private errMesg: string;
  public travelCoverPath = environment.travelCoverPath;
  public customIconPath = environment.customIconPath

  public loading= true;

  @Input() travels: object;

  constructor(
    private travelService: TravelService,
  ) {
    this.travels = [];
    this.errMesg;

   }

  ngOnInit() {

  }



}

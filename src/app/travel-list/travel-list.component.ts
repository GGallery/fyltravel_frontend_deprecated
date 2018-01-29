import {Component, Input, OnInit} from '@angular/core';
import { TravelService } from '../services/travel.service';
import { AuthAppService } from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  public travels;
  private errMesg: string;
  public travelCoverPath = environment.travelCoverPath + 'cover/';
  public customIconPath = environment.customIconPath

  public loading= true;

  @Input() uid: string;

  constructor(
    private travelService: TravelService
  ) {
    this.travels = [];
    this.errMesg;

   }

  ngOnInit() {
    this.getUserTravels(this.uid);
  }

  private getUserTravels(uid: string) {
    this.travelService.getUserTravels(uid)
      .subscribe(
      results => {
        this.loading = false;
        const travels = results;
        this.travels = travels;
        console.log(travels);
      },
      error => this.errMesg = <any>error
      );
  }

}

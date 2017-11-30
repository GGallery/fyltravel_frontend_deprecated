import { Component, OnInit } from '@angular/core';
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
  public travelCoverPath = environment.travelCoverPath;
  public loading= true;

  constructor(
    private travelService: TravelService,
    private auth: AuthAppService
  ) {
    this.travels = [];
    this.errMesg;

   }

  ngOnInit() {
    this.getUserTravels();
  }

  private getUserTravels() {
    this.travelService.getUserTravels()
      .subscribe(
      travels => {
        this.loading = false;
        this.travels = travels,
          console.log(travels);

      },
      error => this.errMesg = <any>error
      );
  }

  private like() {
    console.log('like');
  }

}

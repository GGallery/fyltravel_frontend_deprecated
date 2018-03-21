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


  private errMesg: string;
  public travelCoverPath = environment.travelCoverPath + 'cover/';
  public customIconPath = environment.customIconPath;

  public loading= true;


  constructor(
    private travelService: TravelService
  ) {
    // this.travels = [];
    // this.itinerari = [];
   }

  ngOnInit() {
    // this.getUserFreeTravels(this.uid);
    // this.getItinerari(this.uid);
  }

  // private getUserFreeTravels(uid: string) {
  //   this.travelService.getUserFreeTravels(uid)
  //     .subscribe(
  //       results => {
  //         this.loading = false;
  //         this.travels = results;
  //         console.log('travel' , this.travels);
  //       },
  //       error => this.errMesg = <any>error
  //     );
  // }
  //
  // private getItinerari(uid: string) {
  //   this.travelService.getUserItinerari(uid)
  //     .subscribe(
  //       results => {
  //         this.itinerari = results;
  //         console.log('itinerari' , this.itinerari);
  //       },
  //       error => this.errMesg = <any>error
  //     );
  // }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TravelService} from '../services/travel.service';
import {AuthAppService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-createitinerario',
  templateUrl: './createitinerario.component.html',
  styleUrls: ['./createitinerario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateitinerarioComponent implements OnInit {

  private travels: any[] = [] ;
  private itinerari: any[] = [] ;

  private errMesg: string;

  public travelCoverPath = environment.travelCoverPath + 'cover/';

  constructor(
    private travelService: TravelService,
    private auth: AuthAppService
  ) { }

  ngOnInit() {
    // this.getUserTravels(this.auth.uid);
    this.getUserItinerari(this.auth.uid);
  }

  private getUserTravels(uid: string) {
    this.travelService.getUserTravels(uid)
      .subscribe(
        results => {
          const travels = results;
          this.travels = travels;
          console.log(travels);
        },
        error => this.errMesg = <any>error
      );
  }

  private getUserItinerari(uid: string) {
    this.travelService.getUserItinerari(uid)
      .subscribe(
        results => {
          this.itinerari = results;
          console.log(this.itinerari);
        },
        error => this.errMesg = <any>error
      );
  }


}

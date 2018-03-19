import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TravelService} from '../services/travel.service';
import {AuthAppService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-createitinerario',
  templateUrl: './itinerarioedit.component.html',
  styleUrls: ['./itinerarioedit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItinerarioeditComponent implements OnInit {

  private travels: any[] = [] ;
  private itinerario: any;
  private freetravel: any[] = [];

  private errMesg: string;

  public travelCoverPath = environment.travelCoverPath + 'cover/';

  constructor(
    private travelService: TravelService,
    private auth: AuthAppService
  ) { }

  ngOnInit() {
    // this.getUserTravels(this.auth.uid);
    this.getItinerario(1);
    this.getUserFreeTravels(this.auth.uid);
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

  private getItinerario(id: number) {
    this.travelService.getItinerario(id)
      .subscribe(
        results => {
          this.itinerario = results;
          console.log(this.itinerario);
        },
        error => this.errMesg = <any>error
      );
  }

  private getUserFreeTravels(uid: string) {
    this.travelService.getUserFreeTravels(uid)
      .subscribe(
        results => {
          this.freetravel = results;
          console.log(this.freetravel);
        },
        error => this.errMesg = <any>error
      );
  }
}

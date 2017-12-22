import { Component, OnInit } from '@angular/core';
import {TravelService} from '../services/travel.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private errMesg: string;
  public uid = '15123363665a246beeee140';
  public results: Object;

  constructor(private TravelSv: TravelService) { }

  ngOnInit() {
    console.log('footer');
    this.getBestTravels(this.uid);
  }

  getBestTravels(uid: string) {
    this.TravelSv.getBestTravels(uid)
      .subscribe(
        (result) => {
          const travels = result;
          this.results = travels;
        },
        error => this.errMesg = <any>error
      );
  }

}

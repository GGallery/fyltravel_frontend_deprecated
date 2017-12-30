import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {TravelService} from '../services/travel.service';

@Component({
  selector: 'app-carosello',
  templateUrl: './carosello.component.html',
  styleUrls: ['./carosello.component.css']
})
export class CaroselloComponent implements OnInit {


  private errMesg: string;
  public travelCoverPath = environment.travelCoverPath   + '/cover/';
  public customIconPath = environment.customIconPath;

  public  class: string;

  public travels: object;


  constructor(private travelService: TravelService) { }

  ngOnInit() {
    this.getStarredTravels();
  }

  getStarredTravels() {
    this.travelService.getStarredTravels(4)
      .subscribe(
        (result) => {
          this.travels = result,
          console.log(this.travels);
        },
        error => this.errMesg = <any>error
      );
  }

  attiva() {
    this.class = 'carousel';
  }

}

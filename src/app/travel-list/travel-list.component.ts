import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  public travels;
  private errMesg :string;

  constructor(private travelService: TravelService) {
    this.travels =[];
    this.errMesg;
   }

  ngOnInit() {
    this.getTravel();
  }

  private getTravel() {
    this.travelService.getTravels()
      .subscribe(
      travels => {
        this.travels = travels,
          console.log(travels);

      },
      error => this.errMesg = <any>error
      )
  }

  private like(){
    console.log("like");
  }

  
}

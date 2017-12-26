import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TravelService} from '../services/travel.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public travels: Object;
  public searchTerm$ = new Subject<string>();

  constructor(private TravelService: TravelService) {
      this.TravelService.search(this.searchTerm$)
        .subscribe(results => {
          this.travels = results;
        });
    }


  ngOnInit() {
  }

  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }


}

import { Component, OnInit  } from '@angular/core';
import { NgForm} from '@angular/forms';
import {TravelService} from '../services/travel.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']
})
export class CreatetravelComponent implements OnInit {



  constructor(
    private TravelService: TravelService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));

    this.TravelService.newTravel(form).subscribe(
      (res) => {
        const travel = res;
        this.router.navigate(['/travel', travel.id]);
      }
    );
  }

}

import { Component, OnInit  } from '@angular/core';
import { NgForm} from '@angular/forms';
import {TravelService} from '../services/travel.service';


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']
})
export class CreatetravelComponent implements OnInit {



  constructor(
    private TravelService: TravelService
  ) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));

    this.TravelService.newTravel(form).subscribe(
      (res) => {
        const travel = res;
          alert('l id del tuo viaggio è' + travel.id);
        console.log(res);
      }
    );
  }

}

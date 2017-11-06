import { Component, OnInit  } from '@angular/core';
import { AuthAppService} from '../services/auth.service';

import {Form, NgForm} from '@angular/forms';


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']
})
export class CreatetravelComponent implements OnInit {



  constructor(
    private AuthAppService: AuthAppService
  ) {




  }

  ngOnInit() {
    console.log(this.AuthAppService.currentToken);
    console.log('ok');
  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));

  }

}

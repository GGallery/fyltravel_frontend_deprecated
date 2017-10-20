import { Component, OnInit } from '@angular/core';
import {AuthAppService} from '../services/auth.service';


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']
})
export class CreatetravelComponent implements OnInit {

  constructor(
    private AuthAppService: AuthAppService
  ) { }

  ngOnInit() {
    console.log(this.AuthAppService.currentToken);
        console.log('ok');
  }

}

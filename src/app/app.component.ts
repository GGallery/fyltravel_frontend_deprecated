import { Component } from '@angular/core';
import { AuthAppService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private AuthAppService: AuthAppService
  ) {

    this.AuthAppService.init();

  }



}

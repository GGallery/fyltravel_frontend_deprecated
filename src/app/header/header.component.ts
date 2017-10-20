import { Component, OnInit } from '@angular/core';
import { AuthAppService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private AuthAppService: AuthAppService,
    private router: Router

  ) { }

  ngOnInit() {
  }


  logout() {
    this.AuthAppService.logout();
    console.log(this.AuthAppService.currentToken);
    console.log(this.AuthAppService.userAuthenticated);
  }

}

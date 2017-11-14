import {   Component, OnInit } from '@angular/core';
import { AuthAppService } from '../services/auth.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user_id: number ;
  public isAuthenticated: boolean ;

  constructor(
    public  AuthAppService: AuthAppService,


  ) { }

  ngOnInit() {

    this.user_id = this.AuthAppService.user_id;
    this.isAuthenticated = this.AuthAppService.isAuthenticated();

  }


  logout() {
    this.AuthAppService.logout();
    console.log(this.AuthAppService.currentToken);
    console.log(this.AuthAppService.userAuthenticated);
  }

}

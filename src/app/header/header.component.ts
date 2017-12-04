import {   Component, OnInit } from '@angular/core';
import { AuthAppService } from '../services/auth.service';
import {environment} from '../../environments/environment';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean ;
  public profileImagepath: string;
  public uid: string;

  constructor(
    public  AuthAppService: AuthAppService,


  ) { }

  ngOnInit() {
    this.uid = this.AuthAppService.uid;
    console.log(this.uid);
    this.isAuthenticated = this.AuthAppService.isAuthenticated();
    this.profileImagepath = environment.profileImagePath  + this.AuthAppService.userimage;
    console.log(this.profileImagepath);

  }


  logout() {
    this.AuthAppService.logout();
    console.log(this.AuthAppService.currentToken);
    console.log(this.AuthAppService.userAuthenticated);
  }

}

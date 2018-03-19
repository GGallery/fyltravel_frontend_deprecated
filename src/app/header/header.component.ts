import {   Component, OnInit } from '@angular/core';
import { AuthAppService } from '../services/auth.service';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {TravelService} from '../services/travel.service';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  public isAuthenticated: boolean ;
  public profileImagepath: string;
  public uid = '';


  public results: Object;

  public showResult= false;

  public searchTerm$ = new Subject<string>();
  public travelCoverPath = environment.travelCoverPath;


  constructor(
    public  AuthAppService: AuthAppService,
    public TravelService: TravelService
  ) {

    this.AuthAppService.loginStatus.subscribe(
      status => {
        console.log('Login satus' + status);
        this.login();
      }
    );


    this.TravelService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results;
        this.showResult = true;
        console.log(this.results);
        console.log(this.showResult);

      });

  }


  ngOnInit() {
    this.login();
  }


  hideResult() {
    this.showResult = false;
    console.log('out');
  }

  login() {
    console.log('uid' + this.uid);

    this.uid = this.AuthAppService.uid;

    // console.log('utente corrente' + this.uid);

    this.isAuthenticated = this.AuthAppService.isAuthenticated();
    this.profileImagepath = environment.profileImagePath  + this.AuthAppService.userimage;

  }


  logout() {
    this.AuthAppService.logout();
  }

}

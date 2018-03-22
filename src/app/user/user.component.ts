import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {environment } from '../../environments/environment';
import {TravelService} from '../services/travel.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthAppService} from '../services/auth.service';
import {IUser} from '../model/IUser';
import {IItinerario} from '../model/IItinerario';
import {ITravel} from '../model/ITravel';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public editmode = false;

  public userImagepath: string;

  public countTravel: number;
  public bestTravels: any[];

  public customIconPath = environment.customIconPath;
  public travelCoverPath = environment.travelCoverPath + 'cover/';

  public travels: ITravel[] ;
  public itinerari: IItinerario[] ;

  private errMesg: string;

  public objUSER: IUser;

  constructor(
    private userService: UserService,
    private travelService: TravelService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthAppService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const uid = params['uid'];
      this.get_CountTravel(uid);
      this.get_UserInfo(uid);
      this.getBestTravels(uid);
      this.getUserFreeTravels(uid);
      this.getItinerari(uid);
    });
  }

  private get_CountTravel(uid: string) {
    this.userService.get_CountTravel(uid).subscribe(
      (results) =>  this.countTravel = results,
      (error) => this.errMesg = <any>error
    );
  }

  private getBestTravels(uid: string) {
    this.travelService.getBestTravels(uid)
      .subscribe(
        (result) => {
          const travels = result;
          this.bestTravels = travels;
        },
        error => this.errMesg = <any>error
      );
  }

  private get_UserInfo(uid: string ) {
    this.userService.get_UserInfo(uid).subscribe(
      (response) => {
        this.objUSER = response;
        this.userImagepath = environment.profileImagePath + this.objUSER.image;

        if (this.auth.userid === this.objUSER.id) {
          this.editmode = true;
          console.log('E\' proprio il mio profilo');
        }

      },
      (error) => this.errMesg = <any>error
    );
  }

  private getUserFreeTravels(uid: string) {
    this.travelService.getUserFreeTravels(uid)
      .subscribe(
        results => {
          this.travels = [];
          this.travels = results;
        },
        error => this.errMesg = <any>error
      );
  }

  private getItinerari(uid: string) {
    this.travelService.getUserItinerari(uid)
      .subscribe(
        results => {
          this.itinerari = [];
          this.itinerari = results;
          console.log('itinerari' , this.itinerari);
        },
        error => this.errMesg = <any>error
      );
  }

}


///<reference path="../../environments/environment.ts"/>
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {environment } from '../../environments/environment';
import {forEach} from '@angular/router/src/utils/collection';
import {TravelService} from '../services/travel.service';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public uid: string;

  public userImagepath: string;
  public userName: string;
  public userProfile: string[] = [];
  public userCity: string;
  public countTravel: number;
  public bestTravels: any[];

  public travelCoverPath = environment.travelCoverPath + 'cover/';

  public userInfo: any;
  private errMesg: string;

  constructor(
    private userService: UserService,
    private travelService: TravelService,
    private activatedRoute: ActivatedRoute

  ) {



  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.uid = params['uid'];
      this.get_CountTravel(this.uid);
      this.get_UserInfo(this.uid);
      this.getBestTravels(this.uid);
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
        const user = response;

        this.userImagepath = environment.profileImagePath + user.image;
        this.userName = user.name;
        user.tipology.forEach(single => {
          this.userProfile.push(single.tipologia);
        });
        this.userCity = 'Genova';


      },
      (error) => this.errMesg = <any>error
    );
  }
}


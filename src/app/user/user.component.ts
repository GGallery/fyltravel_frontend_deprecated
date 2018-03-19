///<reference path="../../environments/environment.ts"/>
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {environment } from '../../environments/environment';
import {forEach} from '@angular/router/src/utils/collection';
import {TravelService} from '../services/travel.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthAppService} from '../services/auth.service';
import {FileUploader} from 'ng2-file-upload/file-upload/file-uploader.class';
import {IUser} from '../model/IUser';

const URL_PROFILE_IMAGE = environment.apiUrl + 'upload_profile_image';

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

  // public uploader_profile_image: FileUploader = new FileUploader({ url: URL_PROFILE_IMAGE });
  // public hasBaseDropZoneOver = false;

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
        console.log('UserDAta' , this.objUSER);

        this.userImagepath = environment.profileImagePath + this.objUSER.image;

        if (this.auth.userid === this.objUSER.id) {
          this.editmode = true;
          console.log('E\' proprio il mio profilo');
        }

      },
      (error) => this.errMesg = <any>error
    );
  }


}


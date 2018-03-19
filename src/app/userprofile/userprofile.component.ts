import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthAppService} from '../services/auth.service';
import {IUser} from '../model/IUser';
import {environment} from '../../environments/environment';
import {FileUploader} from 'ng2-file-upload/file-upload/file-uploader.class';
import {FormArray, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';

import { ElementRef, NgZone,  ViewChild, Input } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {IPosition} from '../model/IPosition';

const URL_PROFILE_IMAGE = environment.apiUrl + 'upload_profile_image';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {

  public uid: string;
  public user: IUser;
  public userImagepath: string;
  public uploader_profile_image: FileUploader = new FileUploader({ url: URL_PROFILE_IMAGE });
  public hasBaseDropZoneOver = false;
  public searchControl: FormControl;

  @ViewChild('vivea')
  public searchElementRef: ElementRef;

  constructor(
    private userService: UserService,
    private auth: AuthAppService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,

  ) {
  }

  ngOnInit() {
    this.get_UserInfo(this.auth.uid);
  }

  private get_UserInfo(uid: string ) {
    this.userService.get_UserInfo(uid).subscribe(
      (response) => {
        this.user = response;
        this.userImagepath = environment.profileImagePath + this.user.image;
        this.autosearch();
        console.log(this.user);

      },
      (error) => console.log(error)
    );
  }

  public upload_profile_image(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploader_profile_image.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader_profile_image.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('token', this.auth.currentToken);
      form.append('uid', this.user.uid);
    };
    this.uploader_profile_image.uploadAll();

    this.uploader_profile_image.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      this.userImagepath = environment.profileImagePath + responsePath.file;
    };
  }

  public autosearch() {
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          const position: IPosition = {
              'latitude': place.geometry.location.lat(),
              'longitude': place.geometry.location.lng(),
              'location': place.name,
            }
          ;
          this.user.viveageolocation = JSON.stringify(position);
        });
      });
    });
  }

  onSubmit() {
    console.log(this.user);
    this.userService.updateUser(this.user)
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
  };

}




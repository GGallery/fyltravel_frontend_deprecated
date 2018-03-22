import { Component, OnInit  } from '@angular/core';
import {FormArray, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {TravelService} from '../services/travel.service';
import {Router} from '@angular/router';
import {AuthAppService} from '../services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';
import {environment} from '../../environments/environment';

import { ElementRef, NgZone,  ViewChild, Input } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {ITravel} from '../model/ITravel';
import {publish} from 'rxjs/operator/publish';
import {IPosition} from '../model/IPosition';


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']

})
export class CreatetravelComponent implements OnInit {

  public list_scopo: any[] = [];
  public list_keyword: any[] = [];
  public list_consigliatoa: any[]= [];

  public newTravel: ITravel;

  public scopi: number[] = [];
  public keywords: number[] = [];
  public consigliatoa: number[] = [];

  public customIconPath = environment.customIconPath;

  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private TravelService: TravelService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private AuthAppService: AuthAppService
  ) {

  }

  ngOnInit() {
    this.newTravel = new ITravel({
      title: '',
      author: this.AuthAppService.userid,
      description: '',
      shortdescriptio: '',
      hashtag: '',
      latitude: '',
      longitude: '',
      location: '',
      pubblicato: 0,
      consigliatoa: '',
      keywords: '',
      scopo: '',
      rate: '',
      dal: '',
      al: '',
    });
    console.log(this.newTravel);


    this.getScopi();
    this.getKeywords();
    this.getConsigliatoa();


    this.zoom = 4;

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

          this.newTravel.location = place.geometry.location.lat();
          this.newTravel.longitude = place.geometry.location.lng();
          this.newTravel.location = place.name;

        });
      });
    });

  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));
  }

  getScopi() {
    this.TravelService.getScopi().subscribe(
      (response) => this.list_scopo = response,
      (error) => console.log(error),
      () => console.log(this.list_scopo)
    );
  }

  getKeywords() {
    this.TravelService.getKeywords().subscribe(
      (response) => this.list_keyword = response,
      (error) => console.log(error),
      () => console.log(this.list_keyword)
    );
  }

  getConsigliatoa() {
    this.TravelService.getConsigliatoa().subscribe(
      (response) => this.list_consigliatoa = response,
      (error) => console.log(error),
      () => console.log(this.list_consigliatoa)
    );
  }

  updateScopoOptions(option, event) {
    this.scopi = [];
    this.list_scopo[option].stato  = event.target.checked;
    this.list_scopo.forEach(
      item => {if (item.stato) {
        this.scopi.push(item.id);
      }}
    );
    console.log(JSON.stringify(this.scopi));
  }

  updateKeywordOptions(option, event) {
    this.keywords = [];
    this.list_keyword[option].stato  = event.target.checked;
    this.list_keyword.forEach(
      item => {if (item.stato) {
        this.keywords.push(item.id);
      }}
    );
    console.log(JSON.stringify(this.keywords));
  }

  updateConsigliatoa(option, event) {
    this.consigliatoa = [];
    this.list_consigliatoa[option].stato  = event.target.checked;
    this.list_consigliatoa.forEach(
      item => {if (item.stato) {
        this.consigliatoa.push(item.id);
      }}
    );
    console.log(JSON.stringify(this.consigliatoa));
  }

  saveTravel() {
    this.newTravel.scopo        = this.scopi;
    this.newTravel.keywords     = this.keywords;
    this.newTravel.consigliatoa = this.consigliatoa;

    this.TravelService.newTravel(this.newTravel)
      .subscribe(
        (success) => {
          console.log('salvato travel');
          this.router.navigate(['/travel/' + success ]);
        },
        (error) => console.log(error)
      );
  }
}

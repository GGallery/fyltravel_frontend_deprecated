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


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']

})
export class CreatetravelComponent implements OnInit {

  public list_scopo: any[] = [];
  public list_keyword: any[] = [];
  public list_consigliatoa: any[]= [];

  public id: number;
  public title: string;
  public description: string;
  public hashtag: string;
  public shortdescription: string;
  public rate = 6;
  public scopi: number[] = [];
  public keywords: number[] = [];
  public consigliatoa: number[] = [];
  public dal: string;
  public al: string;
  public customIconPath = environment.customIconPath;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  public  userTravels= 0;

  public latlngBounds: any;
  public bounds: any;

  public mappa: any;

  public tappe: any[] = [];

  @Input() travel_id: number;
  @Input() editmode: boolean;

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

    this.getUserTravels(this.AuthAppService.uid);
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
          // this.tappe.push({
          //   'latitude': place.geometry.location.lat(),
          //   'longitude': place.geometry.location.lng(),
          //   'location': place.name,
          // });

          this.searchControl.reset();

          console.log(place);

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


  getUserTravels(uid: string) {
    this.TravelService.getUserFreeTravels(uid).subscribe(
      (response) => this.userTravels = response.length,
      (error) => console.log(error),
      () => console.log(this.userTravels)
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

  preinsert() {
    this.TravelService.newTravel(this.title ).subscribe(
      (res) => this.id = res,
      (error) => console.log(error)
    );
  }

  saveTravel() {
    this.TravelService.updateTravel(
      this.id,
      this.title,
      this.description,
      this.shortdescription,
      this.hashtag,
      this.rate,
      0,
      this.scopi,
      this.keywords,
      this.consigliatoa,
      this.latitude,
      this.longitude
    ).subscribe(
      (success) => {
        this.TravelService.setTappe(this.id, this.tappe).subscribe(
          (res) => console.log('aggiornate tappe')
        );
        this.router.navigate(['/travel/' + this.id ]);
      },
      (error) => console.log(error)
    );
  }

}

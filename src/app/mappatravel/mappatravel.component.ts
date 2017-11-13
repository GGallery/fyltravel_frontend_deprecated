import { ElementRef, NgZone, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import {TravelService} from '../services/travel.service';


@Component({
  selector: 'app-mappatravel',
  templateUrl: './mappatravel.component.html',
  styleUrls: ['./mappatravel.component.css']
})


export class MappatravelComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  public tappe: any[] = [];

  @Input() travel_id: number;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private travelservice: TravelService

  ) {}

  ngOnInit() {

    this.get_tappe();

    this.zoom = 2;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.tappe.push({
            'latitude': place.geometry.location.lat(),
            'longitude': place.geometry.location.lng(),
            'location': place.name,

          });

          this.searchControl.reset();

          this.travelservice.setTappe(this.travel_id, this.tappe).subscribe(
            (res) => console.log('aggiornate tappe')
        );
          console.log(this.tappe);

          //set latitude, longitude and zoom
          //this.latitude = place.geometry.location.lat();
          //this.longitude = place.geometry.location.lng();
          //this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 2;
      });
    }
  }

  private get_tappe() {

    this.travelservice.getTappe(this.travel_id).subscribe(
      (res) => {
        this.tappe = res;

      }
    );


  }

  public removeTappa(i) {
    console.log(i);
    this.tappe.splice(i);
  }

}

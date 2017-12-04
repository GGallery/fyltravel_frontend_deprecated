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

  public latlngBounds: any;
  public bounds: any;


  public tappe: any[] = [];

  @Input() travel_id: number;
  @Input() editmode: boolean;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private travelservice: TravelService

  ) {}

  ngOnInit() {

    this.get_tappe();

    this.zoom = 4;
    this.latitude = 0;
    this.longitude = 0;

    this.searchControl = new FormControl();

    this.setCurrentPosition();


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

          this.tappe.push({
            'latitude': place.geometry.location.lat(),
            'longitude': place.geometry.location.lng(),
            'location': place.name,
          });

          this.searchControl.reset();

          this.travelservice.setTappe(this.travel_id, this.tappe).subscribe(
            (res) => console.log('aggiornate tappe')
          );
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
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
        this.bounds = this.generateBounds(this.tappe)
        this.latitude = (this.bounds.northeast.latitude + this.bounds.southwest.latitude) / 2;
        this.longitude = (this.bounds.northeast.longitude + this.bounds.southwest.longitude) / 2;
      }
    );
  }

  public generateBounds(markers): any {
    if (markers && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      markers.forEach((marker: any) => {
        console.log(marker);
        const latlong = new google.maps.LatLng( marker.latitude, marker.longitude );
        console.log(latlong);
        bounds.extend(latlong );
      });

      // check if there is only one marker
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        const extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
        bounds.extend(extendPoint);
      }

      return {
        northeast: {
          latitude: bounds.getNorthEast().lat(),
          longitude: bounds.getNorthEast().lng()
        },
        southwest: {
          latitude: bounds.getSouthWest().lat(),
          longitude: bounds.getSouthWest().lng()
        }
      };
    }
    return {};
  }

  public removeTappa(i) {
    console.log(i);
    this.tappe.splice(i, 1);
  }

}

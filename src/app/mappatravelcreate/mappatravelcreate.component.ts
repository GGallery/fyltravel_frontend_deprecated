import { ElementRef, NgZone, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import {TravelService} from '../services/travel.service';


@Component({
  selector: 'app-mappatravelcreate',
  templateUrl: './mappatravelcreate.component.html',
  styleUrls: ['./mappatravelcreate.component.css']
})


export class MappatravelcreateComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  public latlngBounds: any;
  public bounds: any;

  public mappa: any;

  public tappe: any[] = [];

  // @Input() editmode: boolean;
  private editmode: true;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private travelservice: TravelService

  ) {}

  ngOnInit() {

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

          this.latitude = place.geometry.location.lat(),
          this.longitude = place.geometry.location.lng(),
          this.zoom = 2;

          this.searchControl.reset();

          // this.travelservice.setTappe(this.travel_id, this.tappe).subscribe(
          //   (res) => console.log('aggiornate tappe')
          // );
        });
      });
    });
  }


}

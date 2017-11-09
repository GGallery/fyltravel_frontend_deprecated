import { ElementRef, NgZone, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {MatListModule} from '@angular/material/list';


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
  
  public tappe: any[] =[];

  @Input() travel_id:number;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

  this.get_tappe();

    //set google maps defaults
    this.zoom = 2;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.tappe.push({
           'latitude': place.geometry.location.lat(),
           'longitude': place.geometry.location.lng(),
           'location': place.name, 
         
         });
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

  private get_tappe(){
console.log("recupero le tappe per id " + this.travel_id);


  }

public removeTappa(i){
  console.log(i);
  this.tappe.splice(i);
}

}
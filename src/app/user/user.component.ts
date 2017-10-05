import { Component, OnInit } from '@angular/core';

import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { TravelService } from '../services/travel.service';
import { Travel } from '../travel/travel';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  private errMesg: any;

  public positions;

  // @ViewChild("search")
  // public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private travelService: TravelService
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 2;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.positions = [{

    }];

    this.getTravel();

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    // this.setCurrentPosition();

    // load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     //  types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       console.log(place.formatted_address + "=> Latitudine: " + place.geometry.location.lat().toString() + ", Longitudine: " + place.geometry.location.lng().toString());

    //       // let viaggio = new Travel();
    //       // viaggio.author = 1;
    //       // viaggio.description = "prova";
    //       // viaggio.title = "Viaggio";
    //       // // viaggio.latitude = place.geometry.location.lat().toString;
    //       // // viaggio.longitude = place.geometry.location.lng().toString;
    //       // this.positions.push(viaggio);
    //       // this.zoom = 3;
    //       // console.log(this.positions);
    //     });
    //   });
    // });
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



  private getTravel() {
    this.travelService.getTravels()
      .subscribe(
      travels => {
        this.positions = travels,
          console.log(travels);

      },
      error => this.errMesg = <any>error
      )
  }


}


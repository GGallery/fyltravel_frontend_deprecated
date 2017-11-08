import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl} from '@angular/forms';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../environments/environment';

const URL_COPERTINA = environment.apiUrl + '/upload_copertina';
const URL_MEDIA = environment.apiUrl + '/upload_media';
const URL_VIDEO = environment.apiUrl + '/upload_video';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})

export class TravelComponent implements OnInit {
  public id: number;


  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  // Media Upload
  public uploader_copertina: FileUploader = new FileUploader({url: URL_COPERTINA});
  public uploader_immagini: FileUploader = new FileUploader({url: URL_MEDIA});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private route: ActivatedRoute,

    // Map
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone


  ) {
  }




  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {this.id = +params['id'];
          console.log(this.id);
        }
      );

    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // // set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          this.zoom = 3;
        });
      });
    });


  }

  private setCurrentPosition() {
    // this.latitude = ;
    // this.longitude = ;
    this.zoom = 3;
  }

}

import { Component, OnInit} from '@angular/core';
import { ElementRef, NgZone,  ViewChild, Input } from '@angular/core';
import {TravelService} from '../services/travel.service';
import {AuthAppService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {ITravel} from '../model/ITravel';
import {ActivatedRoute} from '@angular/router';
import {FileUploader} from 'ng2-file-upload/file-upload/file-uploader.class';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {FormControl} from '@angular/forms';

const URL_COPERTINA_ITINERARIO = environment.apiUrl + 'upload_cover_itinerario';

@Component({
  selector: 'app-traveledit',
  templateUrl: './traveledit.component.html',
  styleUrls: ['./traveledit.component.css'],
})
export class TraveleditComponent implements OnInit {

  private objTravel: ITravel;

  private errMesg: string;

  public uploader_cover: FileUploader = new FileUploader({ url: URL_COPERTINA_ITINERARIO });
  public hasBaseDropZoneOver = true;
  public itinerarioCoverPath = environment.itinerarioCoverPath;
  public travelCoverPath = environment.travelCoverPath + 'small/';
  public coverUrl = '';
  public geo: any;
  public searchControl: FormControl;

  @ViewChild('geo')
  public searchElementRef: ElementRef;

  constructor(
    private travelService: TravelService,
    private auth: AuthAppService,
    private activatedRoute: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getTravel(id);

    });
  }

  private getTravel(id: number) {
    this.travelService.getTravel(id)
      .subscribe(
        results => {
          this.objTravel = results;
          this.coverUrl = this.objTravel + this.objTravel.cover;
          this.autosearch();
        },
        error => this.errMesg = <any>error
      );
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
          this.objTravel.latitude = place.geometry.location.lat();
          this.objTravel.longitude = place.geometry.location.lng();
          this.objTravel.location = place.name;

        });
      });
    });
  }




  public upload_cover(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploader_cover.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader_cover.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('token', this.auth.currentToken);
      form.append('itinerario_id', this.objTravel.id);
    };
    this.uploader_cover.uploadAll();

    this.uploader_cover.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      this.objTravel.cover = responsePath.file;
      this.coverUrl = this.travelCoverPath + this.objTravel.cover;
      console.log(this.coverUrl);

    };
  }

}

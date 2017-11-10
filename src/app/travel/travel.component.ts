import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl} from '@angular/forms';


import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../environments/environment';
import {TravelService} from '../services/travel.service';

const URL_COPERTINA = environment.apiUrl + 'upload_copertina';
const URL_MEDIA = environment.apiUrl + 'upload_media';
const URL_VIDEO = environment.apiUrl + 'upload_video';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})

export class TravelComponent implements OnInit {
  public id: number;
  public title: string;
  public description: string;
  public image: string;
  public tappe: any[];

  public backgroundImg: string;



  // Media Upload
  public uploader_copertina: FileUploader = new FileUploader({url: URL_COPERTINA});
  public uploader_immagini: FileUploader = new FileUploader({url: URL_MEDIA});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private travelservice: TravelService

  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.travelservice.getTravel(this.id).subscribe(
            (res) => {
              const travel = res;
              this.title = travel.title;
              this.description = travel.description;
              this.image = environment.travelImagePath + travel.image;
              console.log(this.tappe);
            }
          );
        }
      );
  }

  public upload_copertina(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploader_copertina.uploadAll();

    this.uploader_copertina.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      this.image = environment.travelImagePath + responsePath.file;
      this.travelservice.updateTravelImage(this.id, responsePath.file).subscribe(
        (res) => {
          console.log('fatto');
        }
      );

      // const url = 'https://api.fyltravel.it/media/travel/' + responsePath.filename;
      // this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');


    };
  }


}

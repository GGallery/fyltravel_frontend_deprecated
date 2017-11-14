import {Component, Input, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
// import {TravelService} from '../services/travel.service';


const URL_MEDIA = environment.apiUrl + 'upload_media';


@Component({
  selector: 'app-mediaupload',
  templateUrl: './mediaupload.component.html',
  styleUrls: ['./mediaupload.component.css']

})
export class MediauploadComponent implements OnInit {
  public uploader_immagini: FileUploader = new FileUploader({url: URL_MEDIA,    });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  private backgroundImg: SafeStyle;

  public travel_images: string[];

  @Input() travel_id: number;

  constructor(
    private sanitizer: DomSanitizer
    // private travelservice: TravelService
  ) {

  }

  ngOnInit() {
    // this.travelservice.getImages(this.travel_id).subscribe(
    //   (res) => {
    //     this.travel_images = res;
    //   }
    // );
  }

  public upload_immagini(e: any): void {
    this.hasBaseDropZoneOver = e;

    this.uploader_immagini.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('travel_id' , this.travel_id);
    };
    this.uploader_immagini.uploadAll();
    this.uploader_immagini.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      console.log(responsePath);
    };
  }
}

import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { environment } from '../../environments/environment';


const URL_MEDIA = environment.apiUrl + 'upload_media';


@Component({
  selector: 'app-mediaupload',
  templateUrl: './mediaupload.component.html',
  styleUrls: ['./mediaupload.component.css']

})
export class MediauploadComponent {
  public uploader_immagini: FileUploader = new FileUploader({url: URL_MEDIA,    });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  private backgroundImg: SafeStyle;

  @Input() travel_id: number;

  constructor(private sanitizer: DomSanitizer) {



  }


  public upload_immagini(e: any): void {
    this.hasBaseDropZoneOver = e;

    this.uploader_immagini.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('travel_id' , 1);
    };
    this.uploader_immagini.uploadAll();
    this.uploader_immagini.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      console.log(responsePath);
      // this.image = environment.travelImagePath + responsePath.file;
      // this.travelservice.updateTravelImage(this.id, responsePath.file).subscribe(
      //   (res) => {
      //     console.log('fatto');
      //   }
      // );

      // const url = 'https://api.fyltravel.it/media/travel/' + responsePath.filename;
      // this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
    };
  }
}

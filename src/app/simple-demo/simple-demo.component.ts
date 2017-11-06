import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


const URL = 'http://api.fyltravel.it:8000/api/upload';


@Component({
  selector: 'app-simple-demo',
  templateUrl: './simple-demo.component.html',
  styleUrls: ['./simple-demo.component.css']

})
export class SimpleDemoComponent {
  public uploader_copertina: FileUploader = new FileUploader({url: URL});
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  private backgroundImg: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {



  }


  public upload_copertina(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploader_copertina.uploadAll();

    this.uploader_copertina.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      console.log(response, responsePath);
      const url = '/assets/images/' + responsePath.filename;
      // this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
    };
  }
  public upload_images(e: any): void {
    this.hasAnotherDropZoneOver = e;
    this.uploader.uploadAll();
  }

}
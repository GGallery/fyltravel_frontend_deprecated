import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl} from '@angular/forms';


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



  // Media Upload
  public uploader_copertina: FileUploader = new FileUploader({url: URL_COPERTINA});
  public uploader_immagini: FileUploader = new FileUploader({url: URL_MEDIA});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private route: ActivatedRoute,

   


  ) {
  }




  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {this.id = +params['id'];
          console.log(this.id);
        }
      );
}
}
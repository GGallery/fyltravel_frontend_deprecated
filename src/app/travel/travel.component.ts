import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { TravelService } from '../services/travel.service';
import { AuthAppService } from '../services/auth.service';
import {ITravel} from '../model/ITravel';
import event = google.maps.event;

const URL_COPERTINA = environment.apiUrl + 'upload_cover_travel';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  public coverurl: string;

  public scopo: any[]= [];
  public keywords: any[]= [];
  public consigliatoa: any[]= [];

  public backgroundImg: string;

  public editmode: boolean;

  public uploader_cover: FileUploader = new FileUploader({ url: URL_COPERTINA });
  public hasBaseDropZoneOver = false;

  public customIconPath = environment.customIconPath;
  public travelVideoPath = environment.travelVideoPath;

  public textLong = 800;
  public readMoreBtn = true;


  public objTravel: ITravel;

  constructor(
    private route: ActivatedRoute,
    private travelservice: TravelService,
    public auth: AuthAppService

  ) {
  }

  ngOnInit() {
    this.editmode = false;
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = +params['id'];
          this.travelservice.getTravel(id).subscribe(
            (res) => {
              this.objTravel = res;
              this.coverurl = environment.travelCoverPath + 'big/' + this.objTravel.cover;
              console.log(this.auth.userid);
              if (this.auth.userid === this.objTravel.author) {
                this.editmode = true;
              }
            }
          );
        }
      );
  }

  public upload_cover(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploader_cover.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader_cover.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('token', this.auth.currentToken);
      form.append('travel_id', this.objTravel.id);
      form.append('current_cover', this.objTravel.cover);
    };
    this.uploader_cover.uploadAll();

    this.uploader_cover.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      this.objTravel.cover = responsePath.file;
      this.coverurl = environment.travelCoverPath +  'cover/' + this.objTravel.cover;
      console.log(this.coverurl);

    };
  }

  public readMore() {
    this.textLong = 900000;
    this.readMoreBtn = false;
  }


}

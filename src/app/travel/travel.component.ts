import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { TravelService } from '../services/travel.service';
import { AuthAppService } from '../services/auth.service';

const URL_COPERTINA = environment.apiUrl + 'upload_cover';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})

export class TravelComponent implements OnInit {
  public id: number;
  public title: string;
  public description: string;
  public shortdescription: string;
  public cover: string;
  public coverurl: string;
  public tappe: any[];
  public video: string;

  public scopo: any[]= [];
  public keywords: any[]= [];
  public consigliatoa: any[]= [];

  public backgroundImg: string;

  public editmode: boolean;

  public uploader_cover: FileUploader = new FileUploader({ url: URL_COPERTINA });
  public hasBaseDropZoneOver = false;

  public customIconPath = environment.customIconPath;
  public travelVideoPath = environment.travelVideoPath;


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
          this.id = +params['id'];
          this.travelservice.getTravel(this.id).subscribe(
            (res) => {
              const travel = res;
              this.title = travel.title;
              this.description = travel.description;
              this.shortdescription = travel.shortdescription;
              this.cover = travel.cover;
              this.video = travel.video;
              this.scopo  = travel.scopo;
              this.keywords = travel.keywords;
              this.consigliatoa = travel.consigliatoa;
              this.coverurl = environment.travelCoverPath + 'cover/' + this.cover;

              console.log(this.auth.userid);
              console.log(travel);

              if (this.auth.userid === travel.author) {
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
      form.append('travel_id', this.id);
      form.append('current_cover', this.cover);
    };
    this.uploader_cover.uploadAll();

    this.uploader_cover.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      this.cover = responsePath.file;
      this.coverurl = environment.travelCoverPath +  'cover/' + this.cover;
      console.log(this.coverurl);

    };
  }


}

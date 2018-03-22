import { Component, OnInit } from '@angular/core';
import {TravelService} from '../services/travel.service';
import {AuthAppService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {ITravel} from '../model/ITravel';
import {IItinerario} from '../model/IItinerario';
import {ActivatedRoute} from '@angular/router';
import {FileUploader} from 'ng2-file-upload/file-upload/file-uploader.class';

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

  constructor(
    private travelService: TravelService,
    private auth: AuthAppService,
    private activatedRoute: ActivatedRoute,
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
          this.coverUrl = this.objTravel+ this.objTravel.cover;
        },
        error => this.errMesg = <any>error
      );
  }

  public upload_cover(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploader_cover.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader_cover.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('token', this.auth.currentToken);
      form.append('itinerario_id', this.itinerario.id);
    };
    this.uploader_cover.uploadAll();

    this.uploader_cover.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      const responsePath = JSON.parse(response);
      this.itinerario.cover = responsePath.file;
      this.coverUrl = this.itinerarioCoverPath + this.itinerario.cover;
      console.log(this.coverUrl);

    };
  }

}

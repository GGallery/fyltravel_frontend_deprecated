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
  selector: 'app-itinerarioedit',
  templateUrl: './itinerarioedit.component.html',
  styleUrls: ['./itinerarioedit.component.css'],
})
export class ItinerarioeditComponent implements OnInit {

  public freetravels: ITravel[];
  public itinerariotravels: ITravel[];
  private itinerario: IItinerario;

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
      this.getItinerario(id);
      this.getUserFreeTravels(this.auth.uid);
    });
  }

  private getItinerario(id: number) {
    this.travelService.getItinerario(id)
      .subscribe(
        results => {
          this.itinerario = results;
          this.coverUrl = this.itinerarioCoverPath + this.itinerario.cover;
          this.itinerariotravels = this.itinerario.travels;
          console.log(this.itinerario);
        },
        error => this.errMesg = <any>error
      );
  }

  private getUserFreeTravels(uid: string) {
    this.travelService.getUserFreeTravels(uid)
      .subscribe(
        results => {
          this.freetravels = results;
          console.log(this.freetravels);
        },
        error => this.errMesg = <any>error
      );
  }

  public add(travel: ITravel) {
    travel.itinerario = this.itinerario.id;
    this.itinerariotravels.push(travel);
    this.freetravels = this.freetravels.filter(item => item.id !== travel.id);
    this.travelService.updateTravel(travel).subscribe(
      () => console.log('tranfer ok'),
      (err) => console.log(err)
    );
  }

  public remove(travel: ITravel) {
    travel.itinerario = null;
    this.freetravels.push(travel);
    this.itinerariotravels = this.itinerariotravels.filter(item => item.id !== travel.id);
    this.travelService.updateTravel(travel).subscribe(
      () => console.log('tranfer ok'),
      (err) => console.log(err)
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

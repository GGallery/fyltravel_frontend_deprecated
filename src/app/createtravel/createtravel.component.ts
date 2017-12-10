import { Component, OnInit  } from '@angular/core';
import { NgForm} from '@angular/forms';
import {TravelService} from '../services/travel.service';
import {Router} from '@angular/router';
import {AuthAppService} from '../services/auth.service';



@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']

})
export class CreatetravelComponent implements OnInit {


  public list_tipologia = [
    { value: 10, display: 'Viaggio' },
    { value: 20, display: 'Tappa' }
  ];

  public list_scopo = [
    {value: 1, display: 'Lavoro'  },
    {value: 2, display: 'Studio' },
    {value: 3, display: 'Relax' },
    {value: 4, display: 'Avventura' },
    {value: 5, display: 'Cultura' },
    {value: 6, display: 'Svago' },
    {value: 7, display: 'Sport' },
    {value: 8, display: 'Trip' }
  ];

  public list_keyword = [
    {value: 1, display: 'Night life'  },
    {value: 2, display: 'Musei' },
    {value: 3, display: 'Mare' },
    {value: 4, display: 'Food' },
    {value: 5, display: 'Drink' },
    {value: 6, display: 'Escursioni' },
    {value: 7, display: 'Monumenti' },
    {value: 9, display: 'Aperitivi' },
    {value: 10, display: 'Shopping' },
    {value: 11, display: 'Trekking' },
    {value: 12, display: 'Natura' },
    {value: 13, display: 'Terme' },
    {value: 14, display: 'Sport acqua' },
    {value: 15, display: 'Sport aria' },
    {value: 16, display: 'Sport terra' },
    {value: 17, display: 'Montagna' },
    {value: 18, display: 'Barbeque' },
    {value: 19, display: 'Giro in città' },
    {value: 20, display: 'Concerti' }
  ];

  public list_consigliatoa = [
    {value: 1, display: 'Viaggiatore solitario'  },
    {value: 2, display: 'Coppie' },
    {value: 3, display: 'Famiglie' },
    {value: 4, display: 'Gruppi' },
  ];


  public scopo_map = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  }

  public keyword_map = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false
  }





  public list_viaggi: any[];

  public id: number;
  public tipoviaggio: number;
  public title: string;
  public shortdescription: string;
  public description: string;
  public scopo: number[];


  constructor(
    private TravelService: TravelService,
    private AuthAppService: AuthAppService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getTravel();
  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));

    // this.TravelService.newTravel(form).subscribe(
    //   (res) => {
    //     const travel = res;
    //     this.router.navigate(['/travel', travel.id]);
    //   }
    // );
  }

  getTravel() {
    this.TravelService.getUserTravels(this.AuthAppService.uid).subscribe(
      (response) => this.list_viaggi = response,
      (error) => console.log(error)
    );
  }

  updateScopoOptions(option, event) {
    this.scopo_map[option] = event.target.checked;
  }

  updateKeywordOptions(option, event) {
    this.keyword_map[option] = event.target.checked;
  }

  preinsert() {
    this.TravelService.newTravel(this.title).subscribe(
      (res) => this.id = res,
      (error) => console.log(error)
    );
  }


}

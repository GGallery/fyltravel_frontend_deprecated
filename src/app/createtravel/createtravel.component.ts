import { Component, OnInit  } from '@angular/core';
import {FormArray, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {TravelService} from '../services/travel.service';
import {Router} from '@angular/router';
import {AuthAppService} from '../services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']

})
export class CreatetravelComponent implements OnInit {



  public list_scopo: any[] = [];
  public list_keyword: any[] = [];
  public list_consigliatoa: any[]= [];

  public id: number;
  public title: string;
  public description: string;
  public shortdescription: string;
  public rate: number;
  public scopi: number[] =  [];
  public keywords: number[] =  [];
  public consigliatoa: number[] =  [];


  public customIconPath = environment.customIconPath;


  constructor(
    private TravelService: TravelService,
    private router: Router
  ) {  }

  ngOnInit() {

    // this.getTravel();
    this.getScopi();
    this.getKeywords();
    this.getConsigliatoa();
  }

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));
  }

  getScopi() {
    this.TravelService.getScopi().subscribe(
      (response) => this.list_scopo = response,
      (error) => console.log(error),
      () => console.log(this.list_scopo)
    );
  }

  getKeywords() {
    this.TravelService.getKeywords().subscribe(
      (response) => this.list_keyword = response,
      (error) => console.log(error),
      () => console.log(this.list_keyword)
    );
  }

  getConsigliatoa() {
    this.TravelService.getConsigliatoa().subscribe(
      (response) => this.list_consigliatoa = response,
      (error) => console.log(error),
      () => console.log(this.list_consigliatoa)
    );
  }

  updateScopoOptions(option, event) {
    this.scopi = [];
    this.list_scopo[option].stato  = event.target.checked;
    this.list_scopo.forEach(
      item => {if (item.stato) {
        this.scopi.push(item.id);
      }}
    );
    console.log(JSON.stringify(this.scopi));
  }

  updateKeywordOptions(option, event) {
    this.keywords = [];
    this.list_keyword[option].stato  = event.target.checked;
    this.list_keyword.forEach(
      item => {if (item.stato) {
        this.keywords.push(item.id);
      }}
    );
    console.log(JSON.stringify(this.keywords));
  }

  updateConsigliatoa(option, event) {
    this.consigliatoa = [];
    this.list_consigliatoa[option].stato  = event.target.checked;
    this.list_consigliatoa.forEach(
      item => {if (item.stato) {
        this.consigliatoa.push(item.id);
      }}
    );
    console.log(JSON.stringify(this.consigliatoa));
  }

  preinsert() {
    this.TravelService.newTravel(this.title ).subscribe(
      (res) => this.id = res,
      (error) => console.log(error)
    );
  }

  saveTravel() {
    this.TravelService.updateTravel(
      this.id,
      this.title,
      this.description,
      this.shortdescription,
      this.rate,
      0,
      this.scopi,
      this.keywords,
      this.consigliatoa
      ).subscribe(
      (success) => {
        this.router.navigate(['/travel/' + this.id ]);
      },
      (error) => console.log(error)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public countTravel: number;
  public userInfo: any;
  private errMesg: string;

  constructor(
    private userService: UserService

  ) { }

  ngOnInit() {
    this.get_CountTravel();
  }

  private get_CountTravel() {
    this.userService.get_CountTravel().subscribe(
      (results) =>  this.countTravel = results,
      (error) => this.errMesg = <any>error
    );
  }


  private get_UserInfo() {
    this.userService.get_UserInfo().subscribe(
      (results) =>  this.userInfo = results,
      (error) => this.errMesg = <any>error
    );
  }
}


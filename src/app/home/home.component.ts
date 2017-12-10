import { Component, OnInit, ViewChild } from '@angular/core';
// import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild(FBVideoComponent) video: FBVideoComponent;

  constructor(
    // private fb: FacebookService
  ) {

    console.log('Initializing Facebook');


   }

  ngOnInit() {


  }


  // /**
  //  * Login with minimal permissions. This allows you to see their public profile only.
  //  */
  // login() {
  //   this.fb.login()
  //     .then((res: LoginResponse) => {
  //       console.log('Logged in', res);
  //     })
  //     .catch(this.handleError);
  // }

  // /**
  //  * Login with additional permissions/options
  //  */
  // loginWithOptions() {
  //   this.fb.init({
  //     appId: '174233093153100',
  //     version: 'v2.10'
  //   });



  //   const loginOptions: LoginOptions = {
  //     enable_profile_selector: true,
  //     return_scopes: true,
  //     scope: 'public_profile,user_friends,email,pages_show_list'
  //   };

  //   this.fb.login(loginOptions)
  //     .then((res: LoginResponse) => {
  //       console.log('Logged in', res);
  //     })
  //     .catch(this.handleError);

  // }

  // logout() {
  //   this.fb.logout()
  //     .then(console.log.bind(console))
  //     .catch(console.error.bind(console));
  // }

  // getLoginStatus() {
  //   this.fb.getLoginStatus()
  //     .then(console.log.bind(console))
  //     .catch(console.error.bind(console));
  // }


  // /**
  //  * Get the user's profile
  //  */
  // getProfile(loginOptions) {
  //   this.fb.api('/me','get',loginOptions)
  //     .then((res: any) => {
  //       console.log('Got the users profile', res);
  //     })
  //     .catch(this.handleError);
  // }


  // /**
  //  * Get the users friends
  //  */
  // getFriends() {
  //   this.fb.api('/me/friends')
  //     .then((res: any) => {
  //       console.log('Got the users friends', res);
  //     })
  //     .catch(this.handleError);
  // }


  // /**
  //  * Show the share dialog
  //  */
  // share() {

  //   const options: UIParams = {
  //     method: 'share',
  //     href: 'https://github.com/zyramedia/ng2-facebook-sdk'
  //   };

  //   this.fb.ui(options)
  //     .then((res: UIResponse) => {
  //       console.log('Got the users profile', res);
  //     })
  //     .catch(this.handleError);

  // }


  // playVideo() {
  //   this.video.play();
  // }

  // onVideoEvent(ev) {
  //   console.log('Video event fired: ' + ev);
  // }

  // pauseVideo() {
  //   this.video.pause();
  // }



  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }


}

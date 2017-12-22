import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';

import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CaroselloComponent } from './carosello/carosello.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { TravelService } from './services/travel.service';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelComponent } from './travel/travel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


import { Angular2SocialLoginModule } from 'angular2-social-login';
import { AuthAppService } from './services/auth.service';
import { UserService } from './services/user.service';


import { environment } from '../environments/environment';
import { CreatetravelComponent } from './createtravel/createtravel.component';


import { MediauploadComponent } from './mediaupload/mediaupload.component';

import { FileUploadModule } from 'ng2-file-upload';
import { MappatravelComponent } from './mappatravel/mappatravel.component';
import { GalleryComponent } from './gallery/gallery.component';


import { NgxGalleryModule } from 'ngx-gallery';
import { UsermapComponent } from './usermap/usermap.component';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {TravelSearchResultsComponent} from './travel-search-results/travel-search-results';
import { LatestComponent } from './latest/latest.component';


const routes: Routes = [
  { path: 'user/:uid', component: UserComponent },
  { path: 'travels', component: TravelListComponent },
  { path: 'travel/:id', component: TravelComponent },
  { path: 'createtravel', component: CreatetravelComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    CaroselloComponent,
    HomeComponent,
    TravelListComponent,
    TravelComponent,
    SignupComponent,
    SigninComponent,
    CreatetravelComponent,
    MappatravelComponent,
    GalleryComponent,
    MediauploadComponent,
    UsermapComponent,
    TravelSearchResultsComponent,
    LatestComponent

  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey,
      libraries: ['places']
    }),


    AgmSnazzyInfoWindowModule,

    BrowserModule,
    BrowserAnimationsModule,

    NgxGalleryModule,

    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,

    FileUploadModule,
    Angular2SocialLoginModule,


    FormsModule,
    ArchwizardModule,

    ReactiveFormsModule,
    HttpModule,

    RouterModule.forRoot(routes,  { useHash: true })
  ],
  providers: [TravelService, AuthAppService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(environment.socialProviders);

// AIzaSyB7XKfgnB2YT82wrC1W7lW7V7PbQkv77m8

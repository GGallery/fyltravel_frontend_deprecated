import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import {BookService} from "./book/book.service";
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CaroselloComponent } from './carosello/carosello.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AgmCoreModule } from '@agm/core';
import { TravelService } from './services/travel.service';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelComponent } from './travel/travel.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdCardModule, MatIconModule} from '@angular/material';

import { FacebookModule } from 'ngx-facebook';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'user',        component: UserComponent },
  { path: 'signin',      component: SigninComponent },
  { path: 'signup',      component: SignupComponent },
  { path: '',            redirectTo: '/',  pathMatch: 'full' },  
  { path: '**',          component: HomeComponent  }
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
    SigninComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB7XKfgnB2YT82wrC1W7lW7V7PbQkv77m8",
      libraries: ["places"]
    }),
    BrowserModule,
    BrowserAnimationsModule,
    
    MdCardModule,
    MatIconModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpModule, 
    FacebookModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [BookService, TravelService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AIzaSyB7XKfgnB2YT82wrC1W7lW7V7PbQkv77m8
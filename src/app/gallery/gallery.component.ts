import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import {TravelService} from '../services/travel.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];

  @Input() travel_id: number;

  constructor(
    private travelservice: TravelService
  ) { }

  ngOnInit() {

    this.travelservice.getImages(this.travel_id).subscribe(
      (results: any[] ) => {
        const imagelist = results;
        console.log('GalleryImagesLenght: ' + this.galleryImages.length);
         this.galleryImages = imagelist;
      },
      (error) => console.log(error)
    );


    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 6,
        imageAnimation: NgxGalleryAnimation.Fade
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true
      }
    ];

  }


}

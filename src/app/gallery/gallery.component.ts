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


  // URL GIT HUB https://github.com/lukasz-galka/ngx-gallery

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






    // this.galleryImages = [
    //   {
    //     small: 'https://api.fyltravel.it/storage/_i/15105876165a09bce009252.jpg',
    //     medium: 'https://api.fyltravel.it/storage/_i/15105876165a09bce009252.jpg',
    //     big: 'https://api.fyltravel.it/storage/_i/15105876165a09bce009252.jpg',
    //     description: 'description1'
    //   },
    //   {
    //     small: 'https://api.fyltravel.it/storage/_i/15105876175a09bce12ba4b.jpg',
    //     medium: 'https://api.fyltravel.it/storage/_i/15105876175a09bce12ba4b.jpg',
    //     big: 'https://api.fyltravel.it/storage/_i/15105876175a09bce12ba4b.jpg',
    //     description: 'description1'
    //   },
    //   {
    //     small: 'https://api.fyltravel.it/storage/_i/15105876185a09bce246aa9.jpg',
    //     medium: 'https://api.fyltravel.it/storage/_i/15105876185a09bce246aa9.jpg',
    //     big: 'https://api.fyltravel.it/storage/_i/15105876185a09bce246aa9.jpg',
    //     description: 'description1'
    //   },
    //   {
    //     small: 'https://api.fyltravel.it/storage/_i/15105876195a09bce33555d.jpg',
    //     medium: 'https://api.fyltravel.it/storage/_i/15105876195a09bce33555d.jpg',
    //     big: 'https://api.fyltravel.it/storage/_i/15105876195a09bce33555d.jpg'
    //   },
    //   {
    //     small: 'https://api.fyltravel.it/storage/_i/15105876205a09bce4909e9.jpg',
    //     medium: 'https://api.fyltravel.it/storage/_i/15105876205a09bce4909e9.jpg',
    //     big: 'https://api.fyltravel.it/storage/_i/15105876205a09bce4909e9.jpg'
    //   },
    //   {
    //     small: 'https://api.fyltravel.it/storage/_i/15105876225a09bce61be9f.jpg',
    //     medium: 'https://api.fyltravel.it/storage/_i/15105876225a09bce61be9f.jpg',
    //     big: 'https://api.fyltravel.it/storage/_i/15105876225a09bce61be9f.jpg'
    //   }
    // ];
  }


}

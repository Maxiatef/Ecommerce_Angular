import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RecentprodutsComponent } from "../recentproduts/recentproduts.component";
import { OneproductService } from "../../services/oneproduct/oneproduct.service";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule, RecentprodutsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  constructor(private _oneproductService: OneproductService) { }

  carouselItems = [
    { img: 'slider-image-1.jpeg', alt: 'Slide 1' },
    { img: 'slider-2.jpeg', alt: 'Slide 2' },
    { img: 'slider-image-3.jpeg', alt: 'Slide 3' }
  ];
  // Owl carousel options
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    // nav: true,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  }

  categories = [
    { name: "Electronics", img: 'electronics.jpg' },
    { name: 'Mobiles', img: 'mobiles.jpg' },
    { name: 'Men', img: 'men.jpg' },
    { name: "Women", img: 'woman.jpg' },
    { name: 'Home', img: 'home.jpg' },
    { name: 'Beauty & Health', img: 'bueaty.jpg' },
    { name: 'Baby & Toys', img: 'baby.jpg' },

  ];
  secondOptions: OwlOptions = {
    loop: true,
    margin: 5,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: 5 },
    },
  };


  getproductbyid(id: string) {
    this._oneproductService.getProductById(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });

  }
}


import { Component, Input, OnInit } from '@angular/core';
import { OneproductService } from '../../services/oneproduct/oneproduct.service';
import { ActivatedRoute } from '@angular/router';
import { Specificproduct } from '../../interfaces/specificproduct';
import { CommonModule } from '@angular/common';
import { AddtocartService } from '../../services/cart/addtocart.service';
import { GetusercartService } from '../../services/cart/getusercart.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-specificproduct',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './specificproduct.component.html',
  styleUrl: './specificproduct.component.css'
})
export class SpecificproductComponent implements OnInit {
  constructor(
    private _oneproductService: OneproductService,
    private route: ActivatedRoute,
    private _addtocartService: AddtocartService,
    private _getusercartService: GetusercartService
  ) { }

  productId!: string;
  product!: Specificproduct;
  selectedImage: string = '';
  loading: boolean = true;

  ngOnInit(): void {
    this.productId = (this.route.snapshot.paramMap.get('id'))!.toString();
    this._oneproductService.getProductById(this.productId).subscribe({
      next: (data) => {
        console.log(data.data);
        this.product = data.data;
        this.selectedImage = data.data.images[0];
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(id: string): void {
    this._addtocartService.addToCart(id).subscribe({
      next: (data) => {
        console.log(data, 'added to cart');
        this._getusercartService.refreshCart();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

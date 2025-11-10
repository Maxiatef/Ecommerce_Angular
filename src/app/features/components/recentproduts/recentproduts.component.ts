import { Component, OnInit, Output } from '@angular/core';
import { RecentproductService } from '../../services/product/recentproduct.service';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { OneproductService } from "../../services/oneproduct/oneproduct.service";
import { AddtocartService } from '../../services/cart/addtocart.service';
import { GetusercartService } from '../../services/cart/getusercart.service';
import { RouterLink } from "@angular/router";
import { EventEmitter } from 'stream';
import { Router } from 'express';



@Component({
  selector: 'app-recentproduts',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './recentproduts.component.html',
  styleUrl: './recentproduts.component.css'
})
export class RecentprodutsComponent implements OnInit {
  constructor(
    private _recentproductService: RecentproductService,
    private _oneproductService: OneproductService,
    private _addtocartService: AddtocartService,
    private _getusercartService: GetusercartService
  ) { }

  productId! : string;

  recentproducts: Recentproductinterface[] = [];
  calling: any;
  loading: boolean = true;
  getDataFromApi() {

    this.calling = this._recentproductService.getapiData().subscribe({
      next: (data: any) => {
        this.loading = false;
        console.log(data.data);
        this.recentproducts = data.data;
        // console.log(this.recentproducts[0].category.name);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed')
    });
  }

  addToCart(id: string) {
    this._addtocartService.addToCart(id).subscribe({
      next: (data) => {
        console.log(data, 'added to cart');
        // Refresh cart to update count immediately
        this._getusercartService.refreshCart();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


    ngOnInit() {
      this.getDataFromApi();
    }

  }


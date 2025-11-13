import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RecentproductService } from '../../services/product/recentproduct.service';
import { OneproductService } from '../../services/oneproduct/oneproduct.service';
import { AddtocartService } from '../../../features/services/cart/addtocart.service';
import { GetusercartService } from '../../../features/services/cart/getusercart.service';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-recentproduts',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RouterLink],
  templateUrl: './recentproduts.component.html',
  styleUrls: ['./recentproduts.component.css'],
})
export class RecentprodutsComponent implements OnInit {
  recentproducts: Recentproductinterface[] = [];
  loading = true;

  toastVisible = false;
  toastMessage = 'Item added to cart successfully!';
  private toastTimer: any = null;

  constructor(
    private _recentproductService: RecentproductService,
    private _oneproductService: OneproductService,
    private _addtocartService: AddtocartService,
    private _getusercartService: GetusercartService
  ) { }

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this._recentproductService.getapiData().subscribe({
      next: (data: any) => {
        this.loading = false;
        this.recentproducts = data.data || [];
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching products:', err);
      },
    });
  }

  addToCart(id: string, event?: Event) {
    event?.stopPropagation();

    this._addtocartService.addToCart(id).subscribe({
      next: (data) => {
        console.log('Added to cart:', data);
        this._getusercartService.refreshCart();
        this.showToast('Item added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.showToast('Failed to add item to cart.');
      },
    });
  }

  showToast(message: string, duration: number = 3000) {
    this.toastMessage = message;
    this.toastVisible = true;

    if (this.toastTimer) clearTimeout(this.toastTimer);

    this.toastTimer = setTimeout(() => {
      this.toastVisible = false;
    }, duration);
  }

  closeToast() {
    this.toastVisible = false;
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  trackById(index: number, item: any) {
    return item?._id ?? index;
  }
}

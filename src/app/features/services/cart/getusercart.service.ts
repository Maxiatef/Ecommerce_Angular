import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecentproductService } from '../product/recentproduct.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartStateService } from './cart-state.service';

@Injectable({
  providedIn: 'root'
})
export class GetusercartService {

  cart : RecentproductService[] = [];
  
  // BehaviorSubject to store and emit cart data-----------------------------------------------------
  private cartDataSubject = new BehaviorSubject<any>(null);
  cartData$: Observable<any> = this.cartDataSubject.asObservable();

  constructor(
    private _Httpclient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _cartStateService: CartStateService
  ) { }

  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  getUserCart() {
    const headers = new HttpHeaders({
      'token': this.getToken()
    });

    return this._Httpclient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers
      //--------------------------------------------------------------------------------------
    }).pipe(
      tap((response: any) => {
        // Update cart data and count
        this.cartDataSubject.next(response);
        if (response?.data?.products) {
          this._cartStateService.updateCartCount(response.data.products.length);
        }
      })
    );
  }

  // Method to refresh cart data-----------------------------------------------------------
  refreshCart(): void {
    this.getUserCart().subscribe({
      next: (data) => {
        console.log('Cart refreshed:', data);
      },
      error: (error) => {
        console.error('Error refreshing cart:', error);
      }
    });
  }

}

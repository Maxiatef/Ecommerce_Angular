import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartStateService } from './cart-state.service';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearcartService {

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

  clearCart(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.getToken()
    });
    return this._Httpclient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { headers }
    );
  }
}

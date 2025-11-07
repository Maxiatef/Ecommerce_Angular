import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//--------------------------------------------------------------------
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

  constructor(
    private _Httpclient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  addToCart(id: string) {
    const headers = new HttpHeaders({
      'token': this.getToken()
    });

    return this._Httpclient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: id },
      { headers }
    );
  }

}

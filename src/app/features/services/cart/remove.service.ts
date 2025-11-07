import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecentproductService } from '../product/recentproduct.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RemoveService {

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
  removeFromCart(id: string) {
    const headers = new HttpHeaders({
      'token': this.getToken()
    });
    return this._Httpclient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers });
  }
}

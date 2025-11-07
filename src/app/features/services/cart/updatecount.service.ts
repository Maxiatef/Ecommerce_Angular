import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UpdatecountService {

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

  updateCount(id: string, count: number) {
    const headers = new HttpHeaders({
      'token': this.getToken()
    });
    return this._Httpclient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count },
      { headers }
    );
  }
}

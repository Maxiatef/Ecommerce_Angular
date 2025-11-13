import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentproductService {

  constructor(private _Httpclient: HttpClient) {
  }
    getapiData():Observable<any>{
    return this._Httpclient.get('https://ecommerce.routemisr.com/api/v1/products');
  }
}

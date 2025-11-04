import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OneproductService {

  constructor(private _Httpclient: HttpClient) { }

  getProductById(id: string): Observable<any> {
    return this._Httpclient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}

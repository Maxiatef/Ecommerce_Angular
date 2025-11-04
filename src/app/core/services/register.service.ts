import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _httpClient: HttpClient) { }

  register(name: string, email: string, password: string, rePassword: string, phone: string) {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', { name, email, password, rePassword, phone });
  }
}

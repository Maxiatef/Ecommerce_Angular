import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', { email, password });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  baseUrl =
    'https://shortingo-api.onrender.com/api';

  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  register(inputData: any): Observable<any> {
    return this._http.post<object>(
      `${this.baseUrl}/auth/register`,
      inputData,
      {
        headers: this.headerDict,
      }
    );
  }

  login(inputData: any): Observable<any> {
    return this._http.post<object>(`${this.baseUrl}/auth/login`, inputData, {
      headers: this.headerDict,
    });
  }

  isLoggedIn() {
    const token = sessionStorage.getItem('token');
    return token != null;
  }

}

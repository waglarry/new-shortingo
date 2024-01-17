import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  register(inputData: any): Observable<any> {
    return this._http.post<object>(
      `${environment.BaseUrl}/auth/register`,
      inputData,
      {
        headers: this.headerDict,
      }
    );
  }

  login(inputData: any): Observable<any> {
    return this._http.post<object>(`${environment.BaseUrl}/auth/login`, inputData, {
      headers: this.headerDict,
    });
  }

  isLoggedIn() {
    const token = sessionStorage.getItem('token');
    return token ? true : false;
  }

}

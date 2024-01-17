import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShortenedUrlsService {
  authToken = sessionStorage.getItem('token');

  constructor(private _http: HttpClient) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  getAllUserUrls(userId: string, searchTerm?: string): Observable<any> {
    return this._http.get<object>(
      `${environment.BaseUrl}${searchTerm ? '/search/?title=' : '/get-all/'}${
        searchTerm ? searchTerm : userId
      }`,
      {
        headers: this.headers,
      }
    );
  }

  saveUrl(data: any): Observable<any> {
    return this._http.post<any>(`${environment.BaseUrl}/create`, data, {
      headers: this.headers,
    });
  }

  deleteUrl(id: string): Observable<any> {
    return this._http.delete<object>(`${environment.BaseUrl}/delete/${id}`, {
      headers: this.headers,
    });
  }

  updateUrl(id: string, data: object): Observable<any> {
    return this._http.patch<object>(`${environment.BaseUrl}/update/${id}`, data, {
      headers: this.headers,
    });
  }

}

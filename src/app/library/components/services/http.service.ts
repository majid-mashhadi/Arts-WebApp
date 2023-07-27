import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  // baseUrl: string = 'http://localhost:7235/api/v1';
  baseUrl: string = environment.apiURL; // 'http://localhost:8081/api/v1';
  defaultHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    this.defaultHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  get(url: string, options?: any) {
    if (url.indexOf('http') < 0) {
      url = this.baseUrl + url;
    }
    const opt = {
      headers: this.defaultHeaders,
      ...options,
    };
    return this.http.get(url, opt);
  }

  post(url: string, body: any, options?: any) {
    return this.http.post(this.baseUrl + url, body, options);
  }
}

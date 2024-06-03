import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }

  post<ReqType, ResType>(path: string, body: ReqType,
    headers?: { [name: string]: string }): Promise<ResType> {
    return new Promise<ResType>((resolve, reject) => {
      headers = {
        ...{
          'Content-Type': 'application/json'
        }, ...headers
      };
      const httpHeaders = new HttpHeaders(headers);

      const options = { headers: httpHeaders };

      if (!path.startsWith('http'))
        path = `${environment.backend}${path}`;

      this.httpClient
        .post(path, body, options)
        .subscribe(res => { resolve(<ResType>res); });
    });
  }
}

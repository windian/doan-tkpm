import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }

  post<ReqType, ResType>(path: string, body: ReqType): Promise<ResType> {
    return new Promise<ResType>((resolve, reject) => {
      this.httpClient
        .post(`${environment.backend}${path}`, body)
        .subscribe(res => { resolve(<ResType>res); });
    });
  }
}

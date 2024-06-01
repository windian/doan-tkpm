import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { SendReq } from './send-req.model';
import { SendRes } from './send-res.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';//them
import { Observable } from 'rxjs';//them

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  //constructor(private restApi: RestApiService) { }

  //async send(msg: SendReq): Promise<SendRes> {
  //  return this.restApi.post<SendReq, SendRes>("chatbox/send", msg);
  //}
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // URL của OpenAI API
  private apiKey = 'sk-tkpm-YLaTGjlhjXSHKsr55MBsT3BlbkFJIvUSHMZfY1B8jKsLFfcI'; // API key

  constructor(private http: HttpClient) { }

  send(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      prompt: message,
      max_tokens: 150
    };

    return this.http.post<any>(this.apiUrl, body, { headers: headers });
  }
}

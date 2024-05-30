import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { SendReq } from './send-req.model';
import { SendRes } from './send-res.model';

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  constructor(private restApi: RestApiService) { }

  async send(msg: SendReq): Promise<SendRes> {
    return this.restApi.post<SendReq, SendRes>("chatbox/send", msg);
  }
}

import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { SendReq } from './send-req.model';
import { SendRes } from './send-res.model';
import { LoadRes } from './load-res.model';
import { LoadReq } from './load-req.model';

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  constructor(private restApi: RestApiService) { }

  async load(req: LoadReq): Promise<LoadRes> {
    return this.restApi.post<LoadReq, LoadRes>("chatbox/load", req);
  }

  async send(msg: SendReq): Promise<SendRes> {
    return this.restApi.post<SendReq, SendRes>("chatbox/send", msg);
  }
}

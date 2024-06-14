import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoginReq } from './login-req.model';
import { LoginRes } from './login-res.model';
import { RegisterReq } from './register-req.model';
import { RegisterRes } from './register-res.model';
import { ChangePasswordReq } from './change-password-req.model';
import { ChangePasswordRes } from './change-password-res.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private restApi: RestApiService) { }

  async login(req: LoginReq): Promise<LoginRes> {
    return this.restApi.post<LoginReq, LoginRes>("login", req);
  }

  async register(req: RegisterReq): Promise<RegisterRes> {
    return this.restApi.post<RegisterReq, RegisterRes>("register", req);
  }

  async changePassword(req: ChangePasswordReq): Promise<ChangePasswordRes> {
    return this.restApi.post<ChangePasswordReq, ChangePasswordRes>("change-password", req);
  }
}

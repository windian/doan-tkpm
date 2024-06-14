import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login/login.service';
import { LoginReq } from '../../services/login/login-req.model';

export interface LoginDialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDialogContent, MatFormField, MatLabel, MatDialogActions, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public username!: string;
  public password!: string;

  constructor(public service: LoginService) { }

  async loginClick() {
    const res = await this.service.login({ username: this.username, password: this.password, });
    console.log(res);
  }
}

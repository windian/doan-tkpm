import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatDialogContent, MatFormField, MatLabel, MatDialogActions, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  public username!: string;
  public password!: string;
  public newPassword!: string;

  constructor(public service: LoginService) { }

  async changePasswordClick() {
    const res = await this.service.changePassword({ username: this.username, password: this.password, });
    console.log(res);
  }
}

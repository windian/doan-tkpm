import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatDialogContent, MatFormField, MatLabel, MatDialogActions, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public username!: string;
  public password!: string;

  constructor(public service: LoginService) { }

  async registerClick() {
    const res = await this.service.register({ username: this.username, password: this.password, });
    console.log(res);
  }
}

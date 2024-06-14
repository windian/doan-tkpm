import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);
  }
  openRegisterDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
  }
}

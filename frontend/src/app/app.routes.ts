import { Routes } from '@angular/router';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

export const routes: Routes = [
    { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
    { path: 'chatbox', component: ChatboxComponent, title: 'Chatbox' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'change-password', component: ChangePasswordComponent, title: 'ChangePassword' },
    { path: '**', component: AboutUsComponent },
];

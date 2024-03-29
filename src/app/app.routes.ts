import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RegisterSwimmersComponent } from './register-swimmers/register-swimmers.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { VerifyLoginComponent } from './verify-login/verify-login.component';
import { RecoveryPageComponent } from './recovery-page/recovery-page.component';
import { AdminRegisterPageComponent } from './admin-register-page/admin-register-page.component';

import { AuthGuardService as AuthGuard } from '../auth-guard.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'signup', component: SignupPageComponent},
    {path: 'contact', component: ContactComponent},
    {path: '', component: HomePageComponent},
    {path: 'verify', component: VerifyLoginComponent},
    {path: 'recovery', component: RecoveryPageComponent},
    { path: 'register-swimmers', component: RegisterSwimmersComponent, 
        canActivate: [() => inject(AuthGuard).canActivate()]},
    { path: 'admin-register', component: AdminRegisterPageComponent,
        canActivate: [() => inject(AuthGuard).canAdminActivate()]},
];

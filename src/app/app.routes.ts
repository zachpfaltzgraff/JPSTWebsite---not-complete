import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RegisterSwimmersComponent } from './register-swimmers/register-swimmers.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { VerifyLoginComponent } from './verify-login/verify-login.component';
import { RecoveryPageComponent } from './recovery-page/recovery-page.component';

import { AuthGuardService as AuthGuard } from '../auth-guard.service';
import { Component, inject } from '@angular/core';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'signup', component: SignupPageComponent},
    { path: 'register-swimmers', component: RegisterSwimmersComponent, 
        canActivate: [() => inject(AuthGuard).canActivate()]},
    {path: 'contact', component: ContactComponent},
    {path: '', component: HomePageComponent},
    {path: 'verify', component: VerifyLoginComponent},
    {path: 'recovery', component: RecoveryPageComponent},
    {path: '**', redirectTo: 'login'},
];

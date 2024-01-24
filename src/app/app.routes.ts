import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RegisterSwimmersComponent } from './register-swimmers/register-swimmers.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { VerifyLoginComponent } from './verify-login/verify-login.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'signup', component: SignupPageComponent},
    {path: 'register-swimmers', component: RegisterSwimmersComponent},
    {path: '', component: HomePageComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'verify', component: VerifyLoginComponent}
];

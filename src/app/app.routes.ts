import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RegisterSwimmersComponent } from './register-swimmers/register-swimmers.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'signup', component: SignupPageComponent},
    {path: 'register-swimmers', component: RegisterSwimmersComponent},
    {path: '', component: HomePageComponent}
];

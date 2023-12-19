import { Component } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  onSubmit() {
    const emailValue = this.profileForm.value.email ?? '';
    const passwordValue = this.profileForm.value.password ?? '';

    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);
  }

  profileForm = new FormGroup( {
    email: new FormControl(''),
    password: new FormControl(''),
  })
}
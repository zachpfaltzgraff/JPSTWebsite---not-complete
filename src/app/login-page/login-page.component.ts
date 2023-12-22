import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  errorMessage = '';

  onSubmit() {
    if (this.profileForm.valid) {
      this.errorMessage = '';
      const emailValue = this.profileForm.value.email ?? '';
      const passwordValue = this.profileForm.value.password ?? '';

      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);
    }
    else {
      this.errorMessage = 'Invalid Form: Please fill out all fields';
    }
  }

  profileForm = new FormGroup( {
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  })
}
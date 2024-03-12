import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { Router } from '@angular/router';
import { EmailService } from '../../values.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  errorMessage = '';
  failedAttempt = false;
  constructor(private router: Router, private emailService: EmailService) {}

  async onSubmit() {
    if (this.profileForm.valid) {
      this.errorMessage = '';
      const emailValue = this.profileForm.value.email ?? '';
      const passwordValue = this.profileForm.value.password ?? '';

      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);

      await handleSignIn(this.emailService, this.router, { username: emailValue, password: passwordValue });

    }
    else {
      //this.errorMessage = 'Invalid Form: Please fill out all fields';
      alert("Invalid Form: Please fill out all fields");
    }
  }

  profileForm = new FormGroup( {
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  })
}

async function handleSignIn(emailService: EmailService, router: Router, { username, password}: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    emailService.setLogin(true);
    router.navigate(['']);
  } catch (error) {
    emailService.setLogin(false);
    alert(error);
  }
}
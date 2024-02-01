import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signUp } from 'aws-amplify/auth';
import { Router } from '@angular/router';
import { EmailService } from '../../values.service';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  errorMessage = '';

  constructor(private router: Router, private emailService: EmailService) {}


  onSubmit() {
    const emailValue = this.profileForm.value.email ?? '';
    const passwordValue = this.profileForm.value.password ?? '';
    const confirmPasswordValue = this.profileForm.value.confirmPassword ?? '';

    if (emailValue === '' || passwordValue === '' || confirmPasswordValue === '') {
      this.errorMessage = 'Invalid Form: Please fill in all fields';
    }
    else if (passwordValue !== confirmPasswordValue){
      this.errorMessage = 'Error: Passwords must match';
    }
    else if (passwordValue.length < 8 && emailValue !== '' && confirmPasswordValue !== '') {
      this.errorMessage = 'Error: Password must be 8 characters'
    }
    else if (this.profileForm.get('email')?.hasError('email')) {
      this.errorMessage = 'Error: Invalid Email';
    }

    if (this.profileForm.valid) {
      this.errorMessage = '';
      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);

      handleSignUp({ username: emailValue, password: passwordValue, email: emailValue });
      this.emailService.setEmail(emailValue);
      this.emailService.setPassword(passwordValue);
      this.router.navigate(['/verify']);
    }
  }

  profileForm = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(8)),
    confirmPassword: new FormControl('', Validators.required)
  });
}

async function handleSignUp({
  username,
  password,
  email,
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
      }
    });

    console.log(userId);
  } catch (error) {
    console.log('error signing up:', error);
  }
}
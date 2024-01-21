import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  errorMessage = '';

  async onSubmit() {
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

    try {
      await signUp({
        username: emailValue,
        password: passwordValue
      });
  
      // Handle successful signup (you may want to navigate to a confirmation page)
      console.log('Signup successful');
    } catch (error) {
      // Handle signup error
      console.error('Error signing up:', error);
    }

    if (this.profileForm.valid) {
      this.errorMessage = '';
      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);

    }
  }

  profileForm = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(8)),
    confirmPassword: new FormControl('', Validators.required)
  });
}

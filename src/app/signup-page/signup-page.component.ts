import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  onSubmit() {
    const emailValue = this.profileForm.value.email ?? '';
    const passwordValue = this.profileForm.value.password ?? '';
    const confirmPasswordValue = this.profileForm.value.confirmPassword ?? '';

    if (passwordValue === confirmPasswordValue) {
      console.log('Email:', emailValue);
      console.log('Password:', passwordValue);
    }
    else {
      alert('Error: Passwords Must Match');
      window.location.reload();
    }
  }

  profileForm = new FormGroup( {
    email: new FormControl(''),
    password: new FormControl('', Validators.minLength(8)),
    confirmPassword: new FormControl('')
  });
}
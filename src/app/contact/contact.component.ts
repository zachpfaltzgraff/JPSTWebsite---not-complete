import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import cdkOutput from '../../../../jpstCDK/output.json';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {

  constructor(private http: HttpClient, private router: Router ) {} 

  apiEndpoint = cdkOutput.LambdaStack.APIEndpoint1793E782;

  onSubmit() {
    if(this.contactForm.valid) {
      const formData = {
        firstName: this.contactForm.value.firstName ?? '',
        lastName: this.contactForm.value.lastName ?? '',
        email: this.contactForm.value.email ?? '',
        phone: this.contactForm.value.phone ?? '',
        message: this.contactForm.value.message ?? '',
      };
      
      this.http.post(this.apiEndpoint + 'user/post-data', formData)
      .pipe(
        catchError(error => {
          // Handle errors here
          console.error('Error:', error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        // Handle successful response here
        console.log('Response:', response);
        this.router.navigate(['']);
      })
    }
    else {
      alert('Please Fill in all fields');
    }
  }

  contactForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl(''),
    message: new FormControl('', Validators.required)
  })
}
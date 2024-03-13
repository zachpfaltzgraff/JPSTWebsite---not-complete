import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import cdkOutput from '../../../../jpstCDK/output.json';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

  
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextareaModule, InputTextModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {

  constructor(private http: HttpClient, private router: Router ) {} 

  apiEndpoint = cdkOutput.LambdaStack.APIEndpoint1793E782;

  loading: boolean = false;

  async redirect() {
    await new Promise(resolve => setTimeout(resolve, 500));
        
    this.router.navigate(['']);
  }
  onSubmit() {
    if(this.contactForm.valid) {
      this.loading = true;
      const formData = {
        firstName: this.contactForm.value.firstName ?? '',
        lastName: this.contactForm.value.lastName ?? '',
        email: this.contactForm.value.email ?? '',
        phone: this.contactForm.value.phone ?? '',
        message: this.contactForm.value.message ?? '',
      };
      
      emailjs.send('service_dozrgr9', 'template_m4otkpg', {
        ...formData,
        from_name: formData.firstName + ' ' + formData.lastName + '\n' +
        formData.email + ' ' + formData.phone
      }, 'fDVWHz6srbJBO2dQU')
      .then((response: EmailJSResponseStatus) => {
        console.log("email send successfully: ", response);
        this.loading = false;
        alert("Thank you, please give us up to one week to respond!");
        this.redirect();
      }, (error) => {
        console.log("error sending email: ", error);
        this.loading = false;
        alert("Error: Failed to Send email. Please try again later.");
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
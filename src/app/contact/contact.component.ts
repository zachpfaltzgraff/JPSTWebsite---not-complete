import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  onSubmit() {
    if(this.contactForm.valid) {
      const firstName = this.contactForm.value.firstName ?? '';
      const lastName = this.contactForm.value.lastName ?? '';
      const email = this.contactForm.value.email ?? '';
      const message = this.contactForm.value.message ?? '';
    }
    else {
      alert('Please Fill in all fields');
    }
  }


  contactForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    message: new FormControl('', Validators.required)
  })
}

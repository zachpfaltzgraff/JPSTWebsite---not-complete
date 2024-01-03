import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-swimmers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-swimmers.component.html',
  styleUrl: './register-swimmers.component.css'
})
export class RegisterSwimmersComponent {
  onSubmit() {
    if (this.profileForm.valid) {
      const firstName = this.profileForm.value.firstName ?? '';
      const lastName = this.profileForm.value.lastName ?? '';
      const preferredName = this.profileForm.value.preferredName ?? firstName;
      const birthDate = this.profileForm.value.birthDate ?? '';

      const pFirstName = this.profileForm.value.pFirstName ?? '';
      const pLastName = this.profileForm.value.pLastName ?? '';
      const pPhoneNumber = this.profileForm.value.pPhoneNumber ?? '';
      const pAddress = this.profileForm.value.pAddress ?? '';

      const eFirstName = this.profileForm.value.eFirstName ?? '';
      const eLastName = this.profileForm.value.eLastName ?? '';
      const ePhoneNumber = this.profileForm.value.ePhoneNumber ?? '';
      const eAddress = this.profileForm.value.eAddress ?? '';

      console.log(firstName, lastName, preferredName, birthDate, pFirstName, pLastName, pPhoneNumber, pAddress, eFirstName, eLastName, ePhoneNumber, eAddress);
    }
    else {
      alert("Please Fill in all required fields");
    }
  }




  profileForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    preferredName: new FormControl(''),
    birthDate: new FormControl('', Validators.required),
    pFirstName: new FormControl('', Validators.required),
    pLastName: new FormControl('', Validators.required),
    pPhoneNumber: new FormControl('', Validators.required),
    pAddress: new FormControl('', Validators.required),
    eFirstName: new FormControl('', Validators.required),
    eLastName: new FormControl('', Validators.required),
    ePhoneNumber: new FormControl('', Validators.required),
    eAddress: new FormControl('', Validators.required)
  })
}

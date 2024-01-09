import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register-swimmers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-swimmers.component.html',
  styleUrl: './register-swimmers.component.css'
})
export class RegisterSwimmersComponent {
  formGroups: FormGroup[] = [];

  constructor(private fb: FormBuilder) {
    this.addForm();
  }
  
  addForm() {
    const newFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      preferredName: [''],
      birthDate: ['', Validators.required],
      pFirstName: ['', Validators.required],
      pLastName: ['', Validators.required],
      pPhoneNumber: ['', Validators.required],
      pAddress: ['', Validators.required],
      eFirstName: ['', Validators.required],
      eLastName: ['', Validators.required],
      ePhoneNumber: ['', Validators.required],
      eAddress: ['', Validators.required]
    });

    this.formGroups.push(newFormGroup);
  }

  removeForm(index: number) {
    this.formGroups.splice(index, 1);
  }

  onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      const firstName = formGroup.value.firstName ?? '';
      const lastName = formGroup.value.lastName ?? '';
      const preferredName = formGroup.value.preferredName ?? firstName;
      const birthDate = formGroup.value.birthDate ?? '';

      const pFirstName = formGroup.value.pFirstName ?? '';
      const pLastName = formGroup.value.pLastName ?? '';
      const pPhoneNumber = formGroup.value.pPhoneNumber ?? '';
      const pAddress = formGroup.value.pAddress ?? '';

      const eFirstName = formGroup.value.eFirstName ?? '';
      const eLastName = formGroup.value.eLastName ?? '';
      const ePhoneNumber = formGroup.value.ePhoneNumber ?? '';
      const eAddress = formGroup.value.eAddress ?? '';

      console.log(firstName, lastName, preferredName, birthDate, pFirstName, pLastName, pPhoneNumber, pAddress, eFirstName, eLastName, ePhoneNumber, eAddress);
    }
    else {
      alert("Please Fill in all required fields");
    }
  }
}
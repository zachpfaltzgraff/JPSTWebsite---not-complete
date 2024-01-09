import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register-swimmers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-swimmers.component.html',
  styleUrl: './register-swimmers.component.css'
})
export class RegisterSwimmersComponent {
  formGroups: FormGroup[] = [];
  isOpenForm: boolean = true;
  submitted: boolean[] = [];
  saveButtonText: string[] = [];

  constructor(private fb: FormBuilder) {
    this.addForm();
  }

  saveRegisterText(index: number): string {
    return this.saveButtonText[index];
  }
  
  addForm() {
    const newFormGroup = this.fb.group({
      firstName: [{ value: '', disabled: false }, Validators.required],
    lastName: [{ value: '', disabled: false }, Validators.required],
    preferredName: [{ value: '', disabled: false }],
    birthDate: [{ value: '', disabled: false }, Validators.required],
    pFirstName: [{ value: '', disabled: false }, Validators.required],
    pLastName: [{ value: '', disabled: false }, Validators.required],
    pPhoneNumber: [{ value: '', disabled: false }, Validators.required],
    pEmail: [{ value: '', disabled: false }, Validators.required],
    eFirstName: [{ value: '', disabled: false }, Validators.required],
    eLastName: [{ value: '', disabled: false }, Validators.required],
    ePhoneNumber: [{ value: '', disabled: false }, Validators.required],
    eEmail: [{ value: '', disabled: false }, Validators.required]
    });

    this.saveButtonText.push('Save');
    this.submitted.push(false);
    this.isOpenForm = true;
    this.formGroups.push(newFormGroup);
  }

  removeForm(index: number) {
    this.isOpenForm = false;
    this.formGroups.splice(index, 1);
    this.submitted.splice(index, 1);
  }

  onSubmit(formGroup: FormGroup, index: number) {
    if (formGroup.valid) {
      const firstName = formGroup.value.firstName ?? '';
      const lastName = formGroup.value.lastName ?? '';
      const preferredName = formGroup.value.preferredName ?? firstName;
      const birthDate = formGroup.value.birthDate ?? '';

      const pFirstName = formGroup.value.pFirstName ?? '';
      const pLastName = formGroup.value.pLastName ?? '';
      const pPhoneNumber = formGroup.value.pPhoneNumber ?? '';
      const pEmail = formGroup.value.pEmail ?? '';

      const eFirstName = formGroup.value.eFirstName ?? '';
      const eLastName = formGroup.value.eLastName ?? '';
      const ePhoneNumber = formGroup.value.ePhoneNumber ?? '';
      const eEmail = formGroup.value.eEmail ?? '';

      this.isOpenForm = false;
      this.submitted[index] = true;
      this.saveButtonText[index] = 'Register';

      if (index < this.formGroups.length - 1) {
        this.saveButtonText[index + 1] = 'Save';
      }

      console.log(firstName, lastName, preferredName, birthDate, pFirstName, pLastName, pPhoneNumber, pEmail, eFirstName, eLastName, ePhoneNumber, eEmail);
    }
    else {
      alert("Please Fill in all required fields");
    }
  }
}
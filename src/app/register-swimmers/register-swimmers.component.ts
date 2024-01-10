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
  cancelButtonText: string[] = [];

  constructor(private fb: FormBuilder) {
    this.addForm();
  }

  saveRegisterText(index: number): string {
    return this.saveButtonText[index];
  }

  cancelEditText(index: number): string {
    return this.cancelButtonText[index];
  }

  isSumbitted(index:number): boolean {
    return this.submitted[index];
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
    pEmail: ['', Validators.required],
    eFirstName: ['', Validators.required],
    eLastName: ['', Validators.required],
    ePhoneNumber: ['', Validators.required],
    eEmail: ['', Validators.required],


    });

    this.saveButtonText.push('Save');
    this.cancelButtonText.push('Delete')
    this.submitted.push(false);
    this.isOpenForm = true;
    this.formGroups.push(newFormGroup);
  }

  cancelEditBtn(index: number) {
    if (this.cancelButtonText[index] == 'Delete') {
      this.saveButtonText[index] = 'Save';
      this.isOpenForm = false;
      this.formGroups.splice(index, 1);
      this.submitted.splice(index, 1);
    }
    else {
      this.submitted[index] = false;
      this.isOpenForm = true;
      this.saveButtonText[index] = 'Save';
      this.cancelButtonText[index] = 'Delete';
    }
  }

  onSubmit(formGroup: FormGroup, index: number) {
    if (!formGroup.valid) {
      alert("Please Fill in all required fields");
    }
    else if (this.saveButtonText[index] === 'Save') {
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
        this.cancelButtonText[index] = 'Edit';

        console.log(firstName, lastName, preferredName, birthDate, pFirstName, pLastName, pPhoneNumber, pEmail, eFirstName, eLastName, ePhoneNumber, eEmail);
      }
    }
    else if (this.saveButtonText[index] == 'Register') {
      console.log('TESTING TSRING THIS DID WORK'); /* TODO make this so it pops up confirmation window*/
    }
  }
}
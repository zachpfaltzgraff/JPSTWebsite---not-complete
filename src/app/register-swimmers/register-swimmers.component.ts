import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register-swimmers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './register-swimmers.component.html',
  styleUrl: './register-swimmers.component.css',
})
export class RegisterSwimmersComponent {
  formGroups: FormGroup[] = [];
  isOpenForm: boolean = true;
  submitted: boolean[] = [];
  amtRegistered: number = 0;
  saveButtonText: string[] = [];
  cancelButtonText: string[] = [];
  registerButtonClicked: boolean = false;
  registerBtnIndex: number = -1;
  addFormAnimation: boolean[] = [];
  removeFormAnimation: boolean[] = [];
  lastIndex: number = 0;
  
  constructor(private fb: FormBuilder) {
    this.addForm();
  }
  
  addForm() {

    this.addFormAnimation[this.lastIndex]= true;

    setTimeout(() => {
      this.addFormAnimation[this.lastIndex] = false;
    }, 300);

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

      yrsOfExp:[''],
      freestyle:[''],
      backstroke:[''],
      breaststroke:[''],
      butterfly:[''],
      firstStroke:[''],
      firstTime:[''],
      secondStroke:[''],
      secondTime:[''],
      thirdStroke:[''],
      thirdTime:[''],
      ageGroup:[''],
      cost:[''],
    });
    this.saveButtonText.push('Save');
    this.cancelButtonText.push('Delete')
    this.submitted.push(false);
    this.isOpenForm = true;
    this.formGroups.push(newFormGroup);
    this.lastIndex++;
  }

  async cancelEditBtn(index: number) {

    if (this.cancelButtonText[index] == 'Delete') {

      this.removeFormAnimation[index] = true;

      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.removeFormAnimation[index] = false;
      this.saveButtonText[index] = 'Save';
      this.isOpenForm = false;
      this.formGroups.splice(index, 1);
      this.submitted.splice(index, 1);
      this.lastIndex--;
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
    else if (this.saveButtonText[index] == 'Save') {
        if (formGroup.valid) {
            this.isOpenForm = false;
            this.submitted[index] = true;
            this.saveButtonText[index] = 'Register';
            this.cancelButtonText[index] = 'Edit';

            const ageGroup = this.calcAgeGroup(formGroup);
            formGroup.patchValue({
                ageGroup: ageGroup
            });
        }
    }
  }

  registerForm() {
    const index = this.registerBtnIndex;
    if (index == -1) {
      console.log('Error, invalid index of form')
    }
    else {
      const formGroup = this.formGroups[index];

      if (formGroup) {
        Object.keys(formGroup.controls).forEach(controlName => {
          const control = formGroup.get(controlName);
          console.log(`${controlName}: ${control?.value}`);
        })
      }
      this.saveButtonText[index] = 'Registered✓ '
      this.cancelButtonText[index] = 'hidden';
      this.amtRegistered++;
      this.registerButtonClicked = false;
      this.registerBtnIndex = -1;
    }
  }

  calcCost(formGroups: FormGroup[], index: number): string {
    const today = new Date();
    const month = today.getMonth() + 1;
    var cost = '';

    if (this.amtRegistered < 4) {
      cost = (150 - (this.amtRegistered * 10)).toString();
    }
    else {
      cost = (120).toString();
    }

    formGroups[index].patchValue({
      cost: cost
    });

    return cost;
  }

  calcAgeGroup(formGroup: FormGroup): string {
    const birthDate = formGroup.get('birthDate')?.value;

    if (birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);

        const cutoffDate = new Date(today.getFullYear(), 5, 1);

        let age = today.getFullYear() - birthDateObj.getFullYear();

        const hasBirthOcc = today.getMonth() > birthDateObj.getMonth() ||
            (today.getMonth() == birthDateObj.getMonth() &&
                today.getDate() >= birthDateObj.getDate());

        if (hasBirthOcc) {
            age--;
        }

        const hasCelebratedBirthday =
            today.getMonth() > cutoffDate.getMonth() ||
            (today.getMonth() === cutoffDate.getMonth() &&
                today.getDate() >= cutoffDate.getDate());

        if (!hasCelebratedBirthday && birthDateObj.getMonth() <= 5) {
            age--;
        }

        if (age <= 8) {
            return '8 & Under';
        } else if (age == 9 || age == 10) {
            return '9-10';
        } else if (age == 11 || age == 12) {
            return '11-12';
        } else if (age > 13) {
            return '13+';
        }
    }

    return "Error";
  }

  registeredOrNot(index: number): boolean {
    if (this.saveButtonText[index] == 'Registered✓') {
      return true;
    }
    return false;
  }

  registerCancelbtn() {
    this.registerButtonClicked = false;
    this.registerBtnIndex = -1;
  }

  registerField(index: number) {
    if (this.saveButtonText[index] == 'Register') {
      this.registerButtonClicked = true;
      this.registerBtnIndex = index;
    }
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
}
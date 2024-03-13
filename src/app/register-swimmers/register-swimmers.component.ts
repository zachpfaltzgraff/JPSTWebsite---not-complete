import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import cdkOutput from '../../../../jpstCDK/output.json';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

interface experience {
  name: string,
}
interface events {
  name: string,
}

@Component({
  selector: 'app-register-swimmers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, DropdownModule, InputTextModule, CheckboxModule ],
  templateUrl: './register-swimmers.component.html',
  styleUrl: './register-swimmers.component.css',
})
export class RegisterSwimmersComponent {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.fb = fb;
  }
  experience: experience[] = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
    {name: '6'},
    {name: '7'},
    {name: '8'},
    {name: '9'},
    {name: '10+'},
  ]

  events: events[] = [
    {name: '50 Freestyle'},
    {name: '100 Freestyle'},
    {name: '200 Freestyle'},
    {name: '500 Freestyle'},
    {name: '50 Backstroke'},
    {name: '100 Backstroke'},
    {name: '50 Breaststroke'},
    {name: '100 Breaststroke'},
    {name: '50 Butterfly'},
    {name: '100 Butterfly'},
    {name: '100 Individual Medley'},
    {name: '200 Individual Medley'},
  ]


  apiEndpoint = cdkOutput.LambdaStack.APIEndpoint1793E782;

  formGroups: FormGroup[] = [];
  isOpenForm: boolean = false;
  submitted: boolean[] = [];
  amtRegistered: number = 0;
  saveButtonText: string[] = [];
  cancelButtonText: string[] = [];
  registerButtonClicked: boolean = false;
  registerBtnIndex: number = -1;
  addFormAnimation: boolean[] = [];
  removeFormAnimation: boolean[] = [];
  lastIndex: number = 0;

  userData: any;
  ngOnInit(): void {
    this.http.get<any>(this.apiEndpoint + 'swimmer/get-data-swimmer')
    .pipe(catchError(error => {
      console.error('Error frontend: ', error)
      return throwError(error);
    }))
    .subscribe(response => {
      this.userData = response.data;
      console.log('User Data: ', this.userData);
      
        this.userData.forEach((userData: any) => { // Use UserData as the type
        this.addExistingForm(userData);
      });
    })
  }

  addExistingForm(userData: any) {

    const newFormGroup = this.fb.group({
      isSubmitted: [userData.isSubmitted.BOOL],
      firstName: [userData.swimmer.M.firstName.S],
      lastName: [userData.swimmer.M.lastName.S],
      preferredName: [userData.swimmer.M.preferredName.S],
      birthDate: [userData.swimmer.M.birthDate.S],
      pFirstName: [userData.parent.M.firstName.S],
      pLastName: [userData.parent.M.lastName.S],
      pPhoneNumber: [userData.parent.M.phoneNumber.S],
      pEmail: [userData.parent.M.email.S],
      eFirstName: [userData.eContact.M.firstName.S],
      eLastName: [userData.eContact.M.lastName.S],
      ePhoneNumber: [userData.eContact.M.phoneNumber.S],
      eEmail: [userData.eContact.M.email.S],

      yrsOfExp:[userData.experience.M.yrsOfExp.S],
      freestyle:[userData.experience.M.canSwim.M.freestyle.BOOL],
      backstroke:[userData.experience.M.canSwim.M.backstroke.BOOL],
      breaststroke:[userData.experience.M.canSwim.M.breaststroke.BOOL],
      butterfly:[userData.experience.M.canSwim.M.butterfly.BOOL],
      firstStroke:[userData.experience.M.swimTimes.M.firstStroke.S],
      firstTime:[userData.experience.M.swimTimes.M.firstTime.S],
      secondStroke:[userData.experience.M.swimTimes.M.secondStroke.S],
      secondTime:[userData.experience.M.swimTimes.M.secondTime.S],
      thirdStroke:[userData.experience.M.swimTimes.M.thirdStroke.S],
      thirdTime:[userData.experience.M.swimTimes.M.thirdTime.S],
      ageGroup:[userData.ageGroup.S],
      cost:[userData.cost.S],
    })

    if(userData.isSubmitted.BOOL == true) {
      this.saveButtonText[this.lastIndex] = 'Registered✓'
      this.cancelButtonText[this.lastIndex] = 'hidden';
      this.amtRegistered++;
      this.submitted.push(true);
    }
    else {
      this.saveButtonText[this.lastIndex] = 'Register';
      this.cancelButtonText[this.lastIndex] = 'Edit';
      this.submitted.push(true);
    }
      this.isOpenForm = false;
      this.formGroups.push(newFormGroup);
      this.lastIndex++;
  }
  
  addForm() {
    this.addFormAnimation[this.lastIndex]= true;

    setTimeout(() => {
      this.addFormAnimation[this.lastIndex] = false;
    }, 300);

    const newFormGroup = this.fb.group({
      isSubmitted: [false],
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
    this.saveButtonText[this.lastIndex] = 'Save';
    this.cancelButtonText[this.lastIndex] = 'Delete';
    this.submitted.push(false);
    this.isOpenForm = true;
    this.formGroups.push(newFormGroup);
    this.lastIndex++;
  }

  async cancelEditBtn(index: number) {
    if (this.cancelButtonText[index] == 'Delete') {
      const confirmed = confirm("Are you sure you want to delete this swimmer?");

      if (confirmed) {
        this.removeFormAnimation[index] = true;
        
        const formGroup = this.formGroups[index].value;
        const swimmerName = formGroup.firstName + " " + formGroup.lastName;
        console.log(swimmerName);

        const response = await this.http.delete<any>(`${this.apiEndpoint}swimmer/delete-data-swimmer`, 
        { body: { swimmerName } }).toPromise();
        console.log("Response: ", response);

        await new Promise(resolve => setTimeout(resolve, 300));
        this.removeFormAnimation[index] = false;

        this.saveButtonText[index] = 'Register';
        this.cancelButtonText[index] = 'Edit';
        this.isOpenForm = false;
        this.formGroups.splice(index, 1);
        this.submitted.splice(index, 1);
        this.lastIndex--;
      }
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
        this.isOpenForm = false;
        this.submitted[index] = true;
        this.saveButtonText[index] = 'Register';
        this.cancelButtonText[index] = 'Edit';

        let ageGroup = this.calcAgeGroup(formGroup);
        formGroup.value.ageGroup = ageGroup ?? '';

        const formData = {
          isSubmitted: false,
          firstName: formGroup.value.firstName ?? '',
          lastName: formGroup.value.lastName ?? '',
          preferredName: formGroup.value.preferredName ?? '',
          birthDate: formGroup.value.birthDate ?? '',
          pFirstName: formGroup.value.pFirstName ?? '',
          pLastName: formGroup.value.pLastName ?? '',
          pPhoneNumber: formGroup.value.pPhoneNumber ?? '',
          pEmail: formGroup.value.pEmail ?? '',
          eFirstName: formGroup.value.eFirstName ?? '',
          eLastName: formGroup.value.eLastName ?? '',
          ePhoneNumber: formGroup.value.ePhoneNumber ?? '',
          eEmail: formGroup.value.eEmail ?? '',

          yrsOfExp:'',
          freestyle: '',
          backstroke:'',
          breaststroke:'',
          butterfly:'',
          firstStroke:'',
          firstTime:'',
          secondStroke:'',
          secondTime:'',
          thirdStroke:'',
          thirdTime:'',
          ageGroup: formGroup.value.ageGroup ?? '',
          cost:'',
        }

        this.http.post(this.apiEndpoint + 'swimmer/post-data-swimmer', formData)
        .pipe(
          catchError(error => {
            console.error('Error: ', error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Response: ', response);
        });
    }
  }

  registerForm() {
    const index = this.registerBtnIndex;
    if (index == -1) {
      console.log('Error, invalid index of form');
    }
    else {
      const formGroup = this.formGroups[index];

      if (formGroup) {
        Object.keys(formGroup.controls).forEach(controlName => {
          const control = formGroup.get(controlName);
          console.log(`${controlName}: ${control?.value}`);
        })
      }
      formGroup.value.isSubmitted = true;

      const formData = {
        isSubmitted: true,
        firstName: formGroup.value.firstName ?? '',
        lastName: formGroup.value.lastName ?? '',
        preferredName: formGroup.value.preferredName ?? '',
        birthDate: formGroup.value.birthDate ?? '',
        pFirstName: formGroup.value.pFirstName ?? '',
        pLastName: formGroup.value.pLastName ?? '',
        pPhoneNumber: formGroup.value.pPhoneNumber ?? '',
        pEmail: formGroup.value.pEmail ?? '',
        eFirstName: formGroup.value.eFirstName ?? '',
        eLastName: formGroup.value.eLastName ?? '',
        ePhoneNumber: formGroup.value.ePhoneNumber ?? '',
        eEmail: formGroup.value.eEmail ?? '',

        yrsOfExp: formGroup.value.yrsOfExp,
        freestyle: formGroup.value.freestyle,
        backstroke:formGroup.value.backstroke,
        breaststroke: formGroup.value.breaststroke,
        butterfly: formGroup.value.butterfly,
        firstStroke:formGroup.value.firstStroke,
        firstTime: formGroup.value.firstTime,
        secondStroke: formGroup.value.secondStroke,
        secondTime: formGroup.value.secondTime,
        thirdStroke: formGroup.value.thirdStroke,
        thirdTime: formGroup.value.thirdTime,
        ageGroup: formGroup.value.ageGroup,
        cost: formGroup.value.cost,
      }

      this.http.post(this.apiEndpoint + 'swimmer/post-data-swimmer', formData)
      .pipe(
        catchError(error => {
          console.error('Error: ', error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Response: ', response);
      });

      this.saveButtonText[index] = 'Registered✓ '
      this.cancelButtonText[index] = 'hidden';
      this.amtRegistered++;
      this.registerButtonClicked = false;
      this.registerBtnIndex = -1;
    }
  }

  calcCost(formGroups: FormGroup[], index: number): string {
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
    const birthDate = formGroup.value.birthDate;

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
          formGroup.value.ageGroup = '8 & Under';
            return '8 & Under';
        } else if (age == 9 || age == 10) {
          formGroup.value.ageGroup = '9-10';
            return '9-10';
        } else if (age == 11 || age == 12) {
          formGroup.value.ageGroup = '11-12';
            return '11-12';
        } else if (age > 13) {
          formGroup.value.ageGroup = '13+';
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
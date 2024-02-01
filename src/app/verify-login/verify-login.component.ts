import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { EmailService } from '../../values.service';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { Router } from '@angular/router';
import { emit } from 'process';

@Component({
  selector: 'app-verify-login',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './verify-login.component.html',
  styleUrls: ['./verify-login.component.css']
})

export class VerifyLoginComponent implements AfterViewInit {
  inputs!: NodeListOf<HTMLInputElement>;
  button!: HTMLButtonElement;
  constructor(private router: Router, private emailService: EmailService) {}

  ngAfterViewInit(): void {
    this.inputs = document.querySelectorAll("input");
    this.button = document.querySelector("button") as HTMLButtonElement;

    const handleKeyUp = (event: KeyboardEvent) => {
      const currentInput = event.target as HTMLInputElement;
      const nextInput = currentInput.nextElementSibling as HTMLInputElement;
      const prevInput = currentInput.previousElementSibling as HTMLInputElement;
    
      if (nextInput && currentInput.value !== "") {
        nextInput.focus();
      }
    
      if (currentInput.value.length > 1) {
        currentInput.value = currentInput.value.slice(-1);
        return;
      }
    
      if (event.key === "Backspace") {
        if (prevInput instanceof HTMLInputElement) {
          prevInput.focus();
        }
      }
    
      if (!this.inputs[5].disabled && this.inputs[5].value !== "") {
        this.button.classList.add("active");
      } else {
        this.button.classList.remove("active");
      }
    };

    this.inputs.forEach((input) => {
      input.addEventListener("keyup", handleKeyUp);
    });

    this.inputs.forEach((input) => {
    input.addEventListener('keyup', handleKeyUp);
    });

    window.addEventListener("load", () => this.inputs[0].focus());
  }

  onSubmit() {
    const verificationCode = Object.values(this.verifyCode.value).join('');
    console.log(verificationCode);

    const emailValue = this.emailService.getEmail();

    handleSignUpConfirmation(this.emailService, this.router, {username: emailValue, confirmationCode: verificationCode});

    this.router.navigate(['']);
  }

  verifyCode = new FormGroup( {
    code1: new FormControl(''),
    code2: new FormControl(''),
    code3: new FormControl(''),
    code4: new FormControl(''),
    code5: new FormControl(''),
    code6: new FormControl(''),
  });
}

async function handleSignUpConfirmation(emailService: EmailService, router: Router, {
  username,
  confirmationCode
}: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode
    });

    handleSignIn(emailService, router, {username: emailService.getEmail(), password: emailService.getPassword()});
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

async function handleSignIn(emailService: EmailService, router: Router, { username, password}: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    emailService.setLogin(true);
    router.navigate(['']);
  } catch (error) {
    emailService.setLogin(false);
    alert(error);
  }
}

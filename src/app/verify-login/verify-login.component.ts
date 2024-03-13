import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { EmailService } from '../../values.service';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-login',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './verify-login.component.html',
  styleUrls: ['./verify-login.component.css']
})

export class VerifyLoginComponent {
  constructor(private router: Router, private emailService: EmailService) {}

  onSubmit() {
    const verificationCode = this.verifyCode.value.code;
    const codeString = verificationCode != null ? String(verificationCode) : ''; // Convert to string preserving leading zeros
    console.log("verification code: ", codeString);

    const emailValue = this.emailService.getEmail();
    console.log("email: ", emailValue)

    handleSignUpConfirmation(this.emailService, this.router, {username: emailValue, confirmationCode: codeString});

    this.router.navigate(['']);
  }

  verifyCode = new FormGroup( {
    code: new FormControl(''),
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

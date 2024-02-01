import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { resetPassword, type ResetPasswordOutput } from 'aws-amplify/auth';
import {confirmResetPassword, type ConfirmResetPasswordInput} from 'aws-amplify/auth';

@Component({
  selector: 'app-recovery-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recovery-page.component.html',
  styleUrl: './recovery-page.component.css'
})
export class RecoveryPageComponent {
  isVisible = true;
  gotCode = false;
  email = '';


  resetPassword() {
    this.email = this.profileForm.value.email ?? '';
    handleResetPassword(this.email);
    this.isVisible = false;
  }

  getPassword() {
    const confirmCode = this.passwordForm.value.confirmCode ?? '';
    const password = this.passwordForm.value.password ?? '';
    const confirmPassword = this.passwordForm.value.confirmPassword ?? '';

    if (this.gotCode) {
      if (password && confirmPassword != null) {
        if (password == confirmPassword) {
          handleConfirmResetPassword({ 
            username: this.email, 
            confirmationCode: confirmCode.toString(),
            newPassword: password,
          })
        }
        else {
          alert("Passwords have to match");
        }
      }
      else {
        alert("Please fill in all fields");
      }
    }
    if (confirmCode != null) {
      this.gotCode = true;
    }
  }

  profileForm = new FormGroup( {
    email: new FormControl('', [Validators.email, Validators.required]),
  })

  passwordForm = new FormGroup( {
    confirmCode: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.minLength(8), Validators.required]),
  })
}

async function handleResetPassword(username: string) {
  try {
    const output = await resetPassword({ username });
    handleResetPasswordNextSteps(output); 
  } catch (error) {
    console.log(error);
  }
}

function handleResetPasswordNextSteps(output: ResetPasswordOutput) {
  const { nextStep } = output;
  switch (nextStep.resetPasswordStep) {
    case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
      );
      break;
    case 'DONE':
      console.log('Successfully reset password.');
      break;
  }
}

async function handleConfirmResetPassword({
  username,
  confirmationCode,
  newPassword
}: ConfirmResetPasswordInput) {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword });
    alert("Password Reset Successfully");
  } catch (error) {
    console.log(error);
  }
}

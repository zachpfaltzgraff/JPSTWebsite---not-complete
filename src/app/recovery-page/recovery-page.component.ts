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

  resetPassword() {
    const email = this.profileForm.value.email ?? '';
    handleResetPassword(email);
  }

  profileForm = new FormGroup( {
    email: new FormControl('', [Validators.email, Validators.required]),
  })

  passwordForm = new FormGroup( {
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
      // Collect the confirmation code from the user and pass to confirmResetPassword.
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
  } catch (error) {
    console.log(error);
  }
}

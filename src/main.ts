import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import cdkOutput from '../../jpstCDK/output.json';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  Amplify.configure({
    Auth: {
      Cognito: {
        //  Amazon Cognito User Pool ID
        userPoolId: cdkOutput.CognitoStack.PoolId,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolClientId: cdkOutput.CognitoStack.ClientId,
        signUpVerificationMethod: 'code',
      }
    }
  });

  // You can get the current config object
  const currentConfig = Amplify.getConfig();
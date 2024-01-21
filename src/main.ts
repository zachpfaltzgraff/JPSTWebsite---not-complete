import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  Amplify.configure({
    Auth: {
      Cognito: {
        //  Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_b1WfWe8LQ',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolClientId: '',
      }
    }
  });
  
  // You can get the current config object
  const currentConfig = Amplify.getConfig();
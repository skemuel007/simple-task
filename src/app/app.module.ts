import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialLoginModule
} from 'angular-6-social-login';
import { SigninComponent } from './signin/signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WebSpeechModule} from './web-speech/web-speech.module';
import {SharedModule} from './shared/shared.module';
import {
  RxSpeechRecognitionService,
  SpeechRecognitionLang,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionModule,
  SpeechRecognitionService
} from '@kamiazya/ngx-speech-recognition';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './shared/services/authentication.service';
import { RegisterComponent } from './register/register.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';

// configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('399164634345893')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('101443309323-q4g5fn6pn6vvfqfgfsfc5dkq2r5mkh2b.apps.googleusercontent.com')
      },
      {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    WebSpeechModule,
    SharedModule,
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    HttpClientModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    }),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {
      provide: SpeechRecognitionLang,
      useValue: 'en-US',
    },
    {
      provide: SpeechRecognitionMaxAlternatives,
      useValue: 1,
    },
    SpeechRecognitionService,
    RxSpeechRecognitionService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

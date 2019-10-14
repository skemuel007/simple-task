import { Component, OnInit } from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from 'angular-6-social-login';
import {resultList, RxSpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  message = '';
  constructor(private socialAuthService: AuthService,
              private toastr: ToastrService,
              public service: RxSpeechRecognitionService) { }

  ngOnInit() {
  }

  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }

  socialSignIn(socialPlatform: string) {
    // tslint:disable-next-line:prefer-const
    let socialPlatformProvider;
    if ( socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if ( socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if ( socialPlatform === 'linkedin') {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider)
      .then((userData) => {
        console.log(userData);
      });
  }
}

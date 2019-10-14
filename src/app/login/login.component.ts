import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {resultList, RxSpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from 'angular-6-social-login';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = false;

  /*message = '';*/

  loginButtonText = 'Sigin in'; // text for the login button that will change dynamically
  loading = false; // when logging in loader shows


  // form properties
  loginFormGroup: FormGroup;
  // form control properties
  emailFormControl = new FormControl('', [
    Validators.required, Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  /**
   * Constructor, inject authservice
   * form builder, router for navigation
   */
  constructor(public authService: AuthenticationService,
              private route: Router,
              private socialAuthService: AuthService,
              private toastr: ToastrService,
              public service: RxSpeechRecognitionService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    // call form initializer
    this.initFormGroup();
  }

  initFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

/*  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }*/

  signin() {
    const loginCredentials = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    };

    console.log(loginCredentials);

    // set loader to true
    this.loading = true;
    // change the button text to show loading
    this.loginButtonText = 'Signing in...';

    // make http request through service subscription
    this.authService.login(loginCredentials)
      .subscribe(
        (result: any) => {
          // set loader to false
          this.loading = false;
          // change buttonText
          this.loginButtonText = 'Sigin in';
          console.log(result);
          // set toastr
          this.toastr.success('Login successful');
          // navigate to a new page
          this.route.navigate(['./web-speech']);
        },
        (error: any) => {
          this.loading = false;
          this.loginButtonText = 'Sigin in';
          console.log(error);
        }
      );
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
        if ( userData !== null) {
          const response = {
            message: 'Success',
            data: {
              token: userData.token,
              user: {
                id: userData.id,
                email: userData.email,
                image: userData.image,
                name: userData.name,
                provider: userData.provider
              }
            }
          };

          localStorage.setItem('currentUser', JSON.stringify(response.data));
          // set toastr
          this.toastr.success('Login successful');
          // navigate to a new page
          this.route.navigate(['./web-speech']);
        }
      }).catch((error) => {
        this.toastr.error('Social login error, please try again');
    });
  }

}

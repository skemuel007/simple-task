import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenictationService} from "../_shared/services/authenictation.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  navbarOpen = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;
  hide = true;
  registerLoader = false;
  fogotLoader = false;
  loginLoader = false;

  constructor(public authentication: AuthenictationService, public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      /*confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), CompareValidator('password')])*/
    });
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  closeNavBar() {
    this.navbarOpen = false;
  }
  loginSubmit(loginModal) {
    /// TODO: Remove logging to the console
    this.authentication.signin(this.loginForm.value).subscribe(
      (result: any) => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        localStorage.setItem('email', result.email);
        loginModal.hideModal();
        this.router.navigate(['./application']);
      },
      (err) => {
      }
    );
  }
  registerSubmit(registerModal, loginModal) {
    this.registerLoader = true;
    // TODO: Register the user code
    this.authentication.signup(this.registerForm.value).subscribe(
      (result: any) => {
        console.log(result);
      },
      (err) => {
        this.registerLoader = false;
        console.log(err);
      },
      () => {
        this.registerLoader = false;
      }
    );
  }
  /*forgotSubmit() {
    /// Todo: forgot password implementation
    this.fogotLoader = true;
    setTimeout(() => {
      this.fogotLoader = false;
      console.log('Done');
    }, 20000);
  }

  showModal(modalToShow, modalToClose) {
    this.closeModal(modalToClose);
    modalToShow.show();
  }

  closeModal(modal) {
    modal.hide();
  }*/

}

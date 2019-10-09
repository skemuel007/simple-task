import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = false;
  loading = false;

  registerButtonText = 'Register';

  registerFormGroup: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email

  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public auth: AuthenticationService,
              private router: Router,
              private toastr: ToastrService,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.registerFormGroup = this.formBuilder.group({
      name: this.nameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }
  register() {
    this.loading = true;
    this.registerButtonText = 'Registering...';
    this.auth.register(this.registerFormGroup.value)
      .subscribe(
        (result: any) => {
          this.loading = false;
          this.registerButtonText = 'Register';
          this.toastr.success(result.message);
          this.router.navigate(['./login']);
        },
        (error: any) => {

          this.loading = false;
          this.registerButtonText = 'Register';
          console.log(error);
        }
      );
  }
}

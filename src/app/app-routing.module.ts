import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebSpeechComponent} from './web-speech/web-speech.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'web-speech',
    component: WebSpeechComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

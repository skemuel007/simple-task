import { Component } from '@angular/core';
import {AuthenticationService} from './shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-task';

  constructor(public authService: AuthenticationService,
              private router: Router) {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

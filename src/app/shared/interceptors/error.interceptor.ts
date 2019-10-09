import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public authService: AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError( err => {
      if ([403, 408].indexOf(err.status) !== -1) {

        if ( err.status === 408) {
/*
          this.toastr.error('Request timed out due to poor connection, logging out!');
*/
          console.log('408 called');
        }
        this.authService.logout();
        location.reload(true);
      }

      if ( err.status === 500) {
        // this.toastr.error('An internal server error occurred, please contact web administrator');
        console.log('An internal server error occured, please contact web administrator');
      }

      if (err.status === 401) {
        this.router.navigate(['/home']);
        // console.log('Unauthorized User')
      }

      if ( err.status === 0) {
        /*this.toastr.warning('No internet connection, Please check your internet connection and try again!');*/
        console.log('No internet connection');
      }

      const error = {
        message: err.error.message,
        statusText: err.statusText,
        status: err.status
      } ;
      return throwError(error);
    }));
  }
}

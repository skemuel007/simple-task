import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpOptions} from '../../util/http-options';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(loginDetails): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/authenticate`, JSON.stringify(loginDetails),
      HttpOptions.getHttpOptions())
      .pipe(
        map((result: any) => {
          this.storeData(result);
          return result;
        })
      );
  }

  register(userDetails): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, JSON.stringify(userDetails),
      HttpOptions.getHttpOptions())
      .pipe(
        map((result: any) => {

          return result;
        })
      );
  }


  storeData(result) {
    localStorage.setItem('currentUser', JSON.stringify(result.data));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if ( localStorage.getItem('currentUser') !== null) {
      return true;
    }
    return false;
  }
}

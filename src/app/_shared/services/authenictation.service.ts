import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpOptions} from '../utils/http_options';

@Injectable({
  providedIn: 'root'
})
export class AuthenictationService {
  apiEndPoint = environment.ApiEndPoint;

  constructor(public httpClient: HttpClient) { }

  signup(registerDetail): Observable<any> {
    return this.httpClient.post<any>(this.apiEndPoint + '/auth/register', JSON.stringify(registerDetail), HttpOptions.getHttpOption()).pipe(
      map((result: any) => {
        localStorage.setItem('message', result.message);
        return result;
      })
    );
  }
  signin(loginDetail): Observable<any> {
    return this.httpClient.post<any>(this.apiEndPoint + '/auth/login', JSON.stringify(loginDetail), HttpOptions.getHttpOption()).pipe(
      map((result: any) => {
        // console.log(result);
        localStorage.setItem('token', result.token);
        return result;
      })
    );
  }
}

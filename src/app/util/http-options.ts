import {HttpHeaders} from '@angular/common/http';

export class HttpOptions {

  static getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return httpOptions;
  }
}

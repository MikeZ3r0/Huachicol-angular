import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  httpOptions: {};

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth),
      })
    };
    let token = this.obtenerToken();
  }

  log(logUsuario, logContrasena) {
    const data = new URLSearchParams()
    data.set('username', logUsuario);
    data.set('password', logContrasena);
    data.set('grant_type', 'password');
    console.log(data);
    return this.http.post(environment.loginPoint, data.toString(), this.httpOptions).pipe(
      map(datos => {
        return datos;
      })
    );
  }

  obtenerToken() {
    const userData = localStorage.getItem('userAuth');
    if (!userData) {
      return null;
    }
    const userJSON = JSON.parse(userData);
    return userJSON.access_token;
  }
}

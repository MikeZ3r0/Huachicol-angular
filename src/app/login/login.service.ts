import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable()
export class LoginService {
  httpOptions: {};
  httpOptionsAuth: {};
  token;
  myAccount: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth),
      })
    };
    this.token = this.obtenerToken();
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
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return token;
  }

  obtenerDatos() {
    this.token = this.obtenerToken();
    if (!this.token) {
      return null;
    }
    this.httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token,
      })
    };
    return this.http.get(environment.reportPoint, this.httpOptionsAuth).pipe(
      map( datos => {
        return datos;
      })
    );
  }

  setAccount(estado) {
    // Guarda el estado de la página mi cuenta
    this.myAccount = estado;
  }

  getAccount() {
    // Indica si se esta en la página de mi cuenta o no
    return this.myAccount;
  }

  finalizarSesion() {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setAccount(false);
  }
}

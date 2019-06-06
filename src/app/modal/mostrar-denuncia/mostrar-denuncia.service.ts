import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class MostrarDenunciaService {
  httpOptionsAuth: {};
  token;
  denuncia;

  constructor(private http: HttpClient, private router: Router) {

  }

  getToken() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      return null;
    }
    return this.token;
  }

  getDenuncia() {
    this.token = this.getToken();
    if (!this.token) {
      return null;
    }
    this.httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token,
      })
    };
    const userName = localStorage.getItem('userName');
    console.log(environment.mostrarDenuncia+userName);
    return this.http.get(environment.mostrarDenuncia+userName, this.httpOptionsAuth).pipe(
      map( datos => {
        return datos;
      })
    );
  }
}

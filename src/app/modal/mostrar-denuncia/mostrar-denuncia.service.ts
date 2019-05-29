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

  getToken(){
    this.token = localStorage.getItem('token');
    if (!this.token) {
      return null;
    }
    console.log("token denuncia service: "+this.token);
    return this.token;
  }

  getDenuncia(){
    console.log("denuncias");
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
    return this.http.get(environment.mostrarDenuncia, this.httpOptionsAuth).pipe(
      map( datos => {
        return datos;
      })
    );
  }



}

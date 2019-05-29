import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Denuncia} from '../denuncia';


@Injectable()
export class LoginService {
  httpOptions: {};
  httpOptionsAuth: {};
  token;
  denuncia;

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth),
      })
    };
  //  this.token = this.obtenerToken();
  }

  //Obtiene el token
  log(usuario:string, contrasena:string) {

    console.log("primer token "+this.httpOptions);
    const data = new URLSearchParams()
    data.set('username', usuario);
    data.set('password', contrasena);
    data.set('grant_type', 'password');
    console.log(data);
    return this.http.post(environment.loginPoint, data.toString(), this.httpOptions).pipe(
      map(datos => {
        console.log("datos para token "+datos);
        return datos;
      })
    );
  }


  obtenerToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    console.log("token: "+token);
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
    obtenerDatosDenuncias(){
      console.log("denuncias");
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
      return this.http.get(environment.mostrarDenuncia, this.httpOptionsAuth).pipe(
        map( datos => {
          return datos;
        })
      );
    }

    insertarDenuncia(denuncia: Denuncia){
      console.log("denuncias insertar");
      this.token = this.obtenerToken();
      if (!this.token) {
        return null;
      }
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,

        })
      };
      const jsonDenuncia = JSON.stringify(denuncia);
      console.log("DENUNCIA "+ jsonDenuncia);
      return this.http.post(environment.crearDenuncia, jsonDenuncia, this.httpOptions).pipe(
        map(datos => {
          console.log("datos insertar "+datos);
          return datos;
        })
      );
    }



}

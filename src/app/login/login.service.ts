import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class LoginService {
  httpOptions: {};
  httpOptionsAuth: {};
  token;
  myAccount: boolean;
  denuncias;

  constructor(private http: HttpClient, private router:Router) {
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

  obtenerDuctos() {
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
    return this.http.get(environment.ductosPoint, this.httpOptionsAuth).pipe(
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
    this.router.navigate(['']);
  }

  pedirDenuncias() {
    this.obtenerDatos().subscribe( datos => {
      this.denuncias = {
        "type": "FeatureCollection",
        "features": []
      };
      for (const punto in datos) {
        if (datos.hasOwnProperty(punto)) {
          this.denuncias.features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [datos[punto][0], datos[punto][0]]
            },
            properties: {Descripcion: 'Fuga en tuberia', Status: 'En proceso', Distancia: 'verde', Accion: 'true'}
          });
        }
      }
      return this.denuncias;
    }, (err: any) => {
      const messageError = JSON.stringify(err.error.error);
      console.log(messageError + ' = ' + environment.invalidToken + ' : ');
      console.log(messageError.match(environment.invalidToken));
      if (messageError.match(environment.invalidToken) !== null) {
        this.finalizarSesion();
        return null;
      }
    });
  }

  getDenuncias() {
    this.denuncias = {
      type: 'FeatureCollection',
      features: [
        {type: 'Feature', id: '15', properties: { Descripcion: 'Fuga en tuberia', Status: 'En proceso', Distancia: 'verde', Accion: 'true'},
          geometry: {type: 'Point', coordinates: [-99.1418708, 19.4440685]}},
        {type: 'Feature', id: '17', properties: { Descripcion: 'Sabotaje', Status: 'En proceso', Distancia: 'amarillo', Accion: 'true'},
          geometry: {type: 'Point', coordinates: [-99.0500927, 19.559797]}},
        {type: 'Feature', id: '21', properties: { Descripcion: 'Robo de combustible', Status: 'En espera', Distancia: 'rojo', Accion: 'true'},
          geometry: {type: 'Point', coordinates: [-98.9352197, 19.835556]}},
        {type: 'Feature', id: '30', properties: { Descripcion: 'Fuga en tuberia', Status: 'En espera', Distancia: 'amarillo', Accion: 'true'},
          geometry: {type: 'Point', coordinates: [-105.364325, 28.060944]}},
        {type: 'Feature', id: '42', properties: { Descripcion: 'Robo de combustible', Status: 'Sin asignar', Distancia: 'rojo', Accion: 'true'},
          geometry: {type: 'Point', coordinates: [-104.950253, 27.278238]}},
        {type: 'Feature', id: '43', properties: { Descripcion: 'Fuga en tubería', Status: 'En proceso', Distancia: 'verde', Accion: 'true'},
          geometry: {type: 'Point', coordinates: [-108.814288, 25.761545]}},
      ]};
    return this.denuncias;
  }
}

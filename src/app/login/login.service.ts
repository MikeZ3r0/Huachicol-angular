import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class LoginService {
  httpOptions: {};
  httpOptionsAuth: {};
  token;
  myAccount: boolean;
  denuncias;
  tecnicos;
  sedena;
  sedenaCoord;
  denunciaCoord;

  constructor(private http: HttpClient, private router: Router) {
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
      retry(1),
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

  pedirDenuncias(callback) {
    return this.obtenerDatos().subscribe( datos => {
      this.denuncias = {
        "type": "FeatureCollection",
        "features": []
      };
      const json = JSON.parse(JSON.stringify(datos));
      for (const punto of json) {
        if (punto.hasOwnProperty('center')) {
          this.denuncias.features.push({
            type: 'Feature',
            id: punto._id,
            geometry: {
              type: 'Point',
              coordinates: [punto.center.coordinates[1].toFixed(5), punto.center.coordinates[0].toFixed(5)]
            },
            properties: {Fecha: punto.fecha, Status: punto.estado, Distancia: punto.radio.toFixed(4),
              Pemex: this.checkEstado(punto.estado, 1), SEDENA: this.checkEstado(punto.estado, 2)}
          });
          if (this.checkEstado(punto.estado, 2)) {
            this.denunciaCoord = [punto.center.coordinates[1], punto.center.coordinates[0]];
          }
        }
      }
      callback(true);
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

  checkEstado(texto, modo) {
    if (texto.match( 'Sin asignar' ) !== null ) {
      return false;
    } else if (modo === 1) {
      if (texto.search( /PEMEX en espera/i ) > -1 ) {
        return false;
      }
    } else {
      if (texto.search( /SEDENA en espera/i ) > -1 ) {
        return false;
      }
    }
    return true;
  }

  getDenuncias2() {
    return this.denuncias;
  }

  getDenuncias() {
    this.denuncias = {
      type: 'FeatureCollection',
      features: []};
    return this.denuncias;
  }

  servicioTecnicos() {
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
    return this.http.get(environment.tecnicoPemex, this.httpOptionsAuth).pipe(
      map( datos => {
        return datos;
      })
    );
  }

  servicioSedena() {
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
    return this.http.get(environment.personalSEDENA, this.httpOptionsAuth).pipe(
      map( datos => {
        return datos;
      })
    );
  }

  pedirTecnicos(callback) {
    this.servicioTecnicos().subscribe( datos => {

      this.tecnicos = {
        "type": "FeatureCollection",
        "features": []
      };
      const json = JSON.parse(JSON.stringify(datos));
      for (const tecnico of json) {
        console.log(tecnico);
        if (tecnico.hasOwnProperty('id')) {
          this.tecnicos.features.push({
            type: 'Feature',
            id: tecnico.id,
            properties: {Nombre: tecnico.nombre, Status: 'Disponible', Correo: tecnico.userName}
          });
        }
      }
      callback(true);
    });
  }

  getTecnicos() {
    return this.tecnicos;
  }

  pedirSedena(callback) {
    this.servicioSedena().subscribe( datos => {

      this.sedena = {
        "type": "FeatureCollection",
        "features": []
      };
      const json = JSON.parse(JSON.stringify(datos));
      for (const tecnico of json) {
        if (tecnico.hasOwnProperty('id')) {
          this.sedena.features.push({
            type: 'Feature',
            id: tecnico.id,
            properties: {Nombre: tecnico.nombre, Status: 'Disponible', Correo: tecnico.userName}
          });
        }
      }
      callback(true);
    });
  }

  getSedena() {
    return this.sedena;
  }

  asignacion(content) {
    this.token = this.obtenerToken();
    if (!this.token) {
      return null;
    }
    this.httpOptionsAuth = {
      headers: new HttpHeaders({

        Authorization: 'Bearer ' + this.token,
      }),
      params: new HttpParams()
        .set('centro', content.centro )
        .set('asignacion', content.asignacion)
        .set('dependencia', content.dependencia)
    };

    return this.http.put(environment.asignar, {}, this.httpOptionsAuth).pipe(
      map( datos => {
        return datos;
      })
    );
  }

  setSedenaCoord(point) {
    this.sedenaCoord = point;
  }

  setDenunciaCoord(point) {
    this.denunciaCoord = point;
  }

  getSedenaCoord() {
    return this.sedenaCoord;
  }

  getDenunciaCoord() {
    return this.denunciaCoord;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Denuncia} from '../../denuncia';
import { throwError } from 'rxjs';


@Injectable()
export class RealizarDenunciaService {
  httpOptions: {};
  token;

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      return null;
    }
    return this.token;
  }


  setDenuncia(denuncia: Denuncia) {
    console.log('denuncias insertar');
    this.token = this.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    const jsonDenuncia = JSON.stringify(denuncia);
    console.log('DENUNCIA ' + jsonDenuncia);
    return this.http.post(environment.crearDenuncia, jsonDenuncia, this.httpOptions).pipe(
      map(datos => {
        console.log('datos insertar ' + datos);
        return datos;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    const messageError = JSON.stringify(error.error.error);
    console.log('Error: ' + messageError);
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

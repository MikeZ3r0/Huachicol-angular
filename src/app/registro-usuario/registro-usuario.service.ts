import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Usuario} from '../usuario';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class RegistroUsuarioService {
  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  token;
  public url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.registroUsuario;
  }

  setUsuario(usuario:Usuario){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log('usuario ' + JSON.stringify(usuario));
    console.log(httpOptions);
    console.log({headers: this.httpHeaders});
    // const jsonDenuncia = JSON.stringify(denuncia);
    // console.log("DENUNCIA "+ jsonDenuncia+ "token"+this.httpHeaders);
    return this.http.post(this.url, JSON.stringify(usuario), httpOptions).pipe(
      map(datos => {
        const data = datos;
        console.log('datos post ' , data);
      }),
      catchError(e => {
        console.log('post');
        return throwError(e);
      })
    );
  }
}

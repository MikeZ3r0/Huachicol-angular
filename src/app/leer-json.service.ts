import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LeerJSONService {

  constructor( private http: HttpClient) { }

  public getJSON(ruta): Observable<any> {
    return this.http.get(ruta);
  }
}

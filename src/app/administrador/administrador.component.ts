import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  denuncias;
  datos;
  constructor(private loginService: LoginService, private router: Router) {
    this.denuncias = [
      {'Folio':15,'Coordenadas':'19.4440685, -99.1418708','Descripcion':'Fuga en tuberia','Status':'En proceso','Distancia':'verde','Accion':'true'},
      {'Folio':17,'Coordenadas':'19.559797, -99.0500927','Descripcion':'Sabotaje','Status':'En proceso','Distancia':'amarillo','Accion':'true'},
      {'Folio':21,'Coordenadas':'19.835556, -98.9352197','Descripcion':'Robo de combustible','Status':'Finalizado','Distancia':'rojo','Accion':'true'},
      {'Folio':30,'Coordenadas':'28.060944, -105.364325','Descripcion':'Fuga en tuberia','Status':'En espera','Distancia':'amarillo','Accion':'true'},
      {'Folio':42,'Coordenadas':'27.278238, -104.950253','Descripcion':'Robo de combustible','Status':'Sin asignar','Distancia':'rojo','Accion':'true'},
      {'Folio':43,'Coordenadas':'25.761545, -108.814288','Descripcion':'Fuga en tuberia','Status':'En proceso','Distancia':'verde','Accion':'true'}
    ];
  }

  ngOnInit() {
    const token = this.loginService.obtenerToken();
    if (!token) {
      this.router.navigate(['']);
    }
    this.loginService.obtenerDatos().subscribe( datos => {
      this.datos = datos;
      console.log(this.datos);
    }, (err: any) => {
      const messageError = JSON.stringify(err.error.error);
      console.log(messageError + ' = ' + environment.invalidToken + ' : ');
      console.log(messageError.match(environment.invalidToken));
      if (messageError.match(environment.invalidToken) !== null) {
        console.log('Token invalido: ' + environment.invalidToken);
        localStorage.removeItem('userAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['']);
      }
    });
  }

}

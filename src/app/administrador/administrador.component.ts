import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { getDistance} from 'ol/sphere';



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  denuncias;
  tecnicos;
  datos;
  wId: string;
  wCoord: string;
  wDescription: string;
  wStatus: string;
  wDistance: string;
  wAction: string;
  modalReference: NgbModalRef;
  puntoActual;

  constructor(private loginService: LoginService, private router: Router, private modalService: NgbModal) {
    // Se espera que los datos esten en formato GeoJSON
    this.denuncias = this.loginService.getDenuncias();
    this.wId = 'col-1';
    this.wCoord = 'col-md-2';
    this.wDescription = 'col-md-3';
    this.wStatus = 'col-md-2';
    this.wDistance = 'col-md-2';
    this.wAction = 'col-md-2';

    this.tecnicos = {
      type: 'FeatureCollection',
      features: [
        {type: 'Feature', id: '2014', properties: { Nombre: 'Marisol Rodriguez', Status: 'Disponible'},
          geometry: {type: 'Point', coordinates: [-99.1418708, 19.4440685]}},
        {type: 'Feature', id: '0048', properties: { Nombre: 'Carlos Cortes', Status: 'Ocupado',},
          geometry: {type: 'Point', coordinates: [-99.0500927, 19.559797]}},
        {type: 'Feature', id: '4582', properties: { Nombre: 'Jorge Trejo', Status: 'Ocupado',},
          geometry: {type: 'Point', coordinates: [-98.9352197, 19.835556]}},
        {type: 'Feature', id: '5548', properties: { Nombre: 'Gilberto Rosas', Status: 'Disponible',},
          geometry: {type: 'Point', coordinates: [-105.364325, 28.060944]}},
      ]};
  }

  ngOnInit() {
    this.iniciarVariables();
  }

  openVerticallyCentered(content, denuncia) {
    console.log(denuncia);
    this.puntoActual = denuncia.geometry.coordinates;
    this.modalReference = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop', size: 'lg' });
  }

  iniciarVariables() {
    const token = this.loginService.obtenerToken();
    this.loginService.setAccount(true);
    if (!token) {
      this.loginService.setAccount(false);
      console.log('No fue posible obtener token, redirigiendo');
      this.router.navigate(['']);
    }
    // this.loginService.pedirDenuncias();
  }

  distancia(pt1, pt2) {
    let dis = 0;
    dis += getDistance(pt1, pt2, null);
    let output;
    if (dis > 1000) {
      output = (Math.round(dis / 1000 * 100) / 100) +
        ' ' + 'km';
    } else {
      output = (Math.round(dis * 100) / 100) +
        ' ' + 'm';
    }
    return output;
  }
}



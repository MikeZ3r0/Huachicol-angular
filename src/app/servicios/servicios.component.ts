import { Component, OnInit } from '@angular/core';
import {MostrarDenunciaService} from '../modal/mostrar-denuncia/mostrar-denuncia.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  sesion = false;
  constructor(private mostrarDenuncia: MostrarDenunciaService, private router: Router) { }

  ngOnInit() {
    if (this.mostrarDenuncia.getToken() === null) {
      this.sesion = false;
    } else {
      this.sesion = true;
    }
  }

  isSesion() {
    if (this.mostrarDenuncia.getToken() === null) {
      this.sesion = false;
    } else {
      this.sesion = true;
    }
    console.log(this.sesion);
  }
}

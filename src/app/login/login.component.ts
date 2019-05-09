import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {
  data;
  rolUser: string;
  rolAdmin: string;
  cargando: boolean;
  modalReference: NgbModalRef;


  constructor(private modalService: NgbModal, private loginService: LoginService, private router: Router) {
    this.rolAdmin = environment.adminRole;
    this.rolUser = environment.userRole;
    this.cargando = false;
  }

  openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' });
  }

  ngOnInit() {
  }

  logIn(user, pass, event) {
    event.preventDefault();
    this.cargando = true;
    (document.getElementById('logButton') as HTMLInputElement).disabled = true;
    this.loginService.log(user, pass).subscribe(datos => {
      this.data = datos;
      const datosString = JSON.stringify(this.data);
      const datosJSON = JSON.parse(datosString);
      const token = datosJSON.access_token;
      const datosAPI = token.toString().split( '.', 3);
      const usuario = JSON.stringify(JSON.parse(atob(datosAPI[1])).authorities[0]);
      localStorage.setItem( 'userAuth', datosString);
      localStorage.setItem( 'token', token);
      localStorage.setItem( 'user', usuario);
      if (usuario.match(this.rolAdmin) !== null) {
        this.cargando = false;
        (document.getElementById('logButton') as HTMLInputElement).disabled = false;
        this.modalReference.close();
        this.loginService.setAccount(true);
        this.router.navigate(['admin']);
      }
    }, err => {
      this.cargando = false;
      (document.getElementById('logButton') as HTMLInputElement).disabled = false;
    }, () => {
      console.log('Finalizado inicio de sesion');
    });
  }

}

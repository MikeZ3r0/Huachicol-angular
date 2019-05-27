import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {NgForm } from '@angular/forms';

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
  sesion = false;
  opcion1 = 'Iniciar sesión';
  opcion2 = 'Registrarse';
  opcion3 = 'Finalizar sesión';


  constructor(private modalService: NgbModal, private loginService: LoginService, private router: Router) {
    this.rolAdmin = environment.adminRole;
    this.rolUser = environment.userRole;
    this.cargando = false;
  }

  openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' });
  }

  ngOnInit() {
    if (this.loginService.obtenerToken() === null) {
      this.sesion = false;
    } else {
      this.sesion = true;
    }
    console.log("segunda "+this.sesion);

  }

  logIn(username: string, password:string,event: Event) {
    event.preventDefault();
    this.cargando = true;
    (document.getElementById('logButton') as HTMLInputElement).disabled = true;
    this.loginService.log(username, password).subscribe(datos => {
      this.data = datos;
      const datosString = JSON.stringify(this.data);
      const datosJSON = JSON.parse(datosString);
      const token = datosJSON.access_token;
      const datosAPI = token.toString().split( '.', 3);
      const usuario = JSON.stringify(JSON.parse(atob(datosAPI[1])).authorities[0]);
      localStorage.setItem( 'userAuth', datosString);
      localStorage.setItem( 'token', token);
      localStorage.setItem( 'user', usuario);
      this.cargando = false;
      (document.getElementById('logButton') as HTMLInputElement).disabled = false;
      if (usuario.match(this.rolAdmin) != null) {
        this.router.navigate(['admin']);
        this.sesion = true;
      }else if((usuario.match(this.rolUser) != null)){
        this.router.navigate(['user']);
        this.sesion = true;
      }else{
        this.router.navigate(['']);
        this.sesion = false;
      }
    }, err => {
      console.log(err);
    }, () => {
      console.log('FInalizado inicio de sesion');
    });
  }

  logUsuario(username:string, password:string){
    event.preventDefault();
    this.cargando = true;
    (document.getElementById('logButton') as HTMLInputElement).disabled = true;
    //obtenemos token
    this.loginService.log(username,password).subscribe(datos => {
      this.data = datos;
      const datosString = JSON.stringify(this.data);
      const datosJSON = JSON.parse(datosString);
      console.log("datos json "+datosJSON);

    })
  }

  logOut(){
    localStorage.removeItem("userAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['']);
    this.sesion = false;
    console.log("final "+this.sesion);

  }

}

import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  public sesion: boolean;
  public miCuenta: boolean;
  public BotonPrincipal: string;
  public opcion1: string;
  public opcion2: string;
  public opcion3: string;
  public opcion4: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.sesion = false;
    this.miCuenta = this.loginService.getAccount();
    this.opcion1 = 'Iniciar sesión';
    this.opcion2 = 'Registrarse';
    this.opcion3 = 'Finalizar sesión';
    this.opcion4 = 'Mi página';
  }

  ngOnInit(): void {
    this.iniciarVariables();
  }

  iniciarVariables() {
    if (this.loginService.obtenerToken() === null) {
      this.sesion = false;
      this.BotonPrincipal = 'Login';
    } else {
      this.BotonPrincipal = 'Mi cuenta';
      this.miCuenta = this.loginService.getAccount();
      this.sesion = true;
    }
  }

  finalizarSesion() {
    this.loginService.finalizarSesion();
    this.miCuenta = false;
    this.iniciarVariables();
    this.router.navigate(['']);
  }

  miPagina() {
    const usuario = localStorage.getItem('user');
    if (!usuario) {
      this.finalizarSesion();
    } else {
      this.loginService.setAccount(true);
      if (usuario.match(environment.adminRole) !== null) {
        this.router.navigate(['admin']);
      }
    }
  }

}

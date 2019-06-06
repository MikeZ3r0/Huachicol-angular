import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public sesion: boolean;
  public BotonPrincipal: string;

  constructor(private loginService: LoginService,private router: Router) {
    this.sesion = false;
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
      this.sesion = true;
    }
  }
  logOut() {
    this.loginService.finalizarSesion();
    this.sesion = false;
    this.router.navigate(['']);
  }

  miPagina() {
    const usuario = localStorage.getItem('user');
    if (!usuario) {
      this.logOut();
    } else {
      this.loginService.setAccount(true);
      if (usuario.match(environment.adminRole) !== null) {
        this.router.navigate(['admin']);
      } else if (usuario.match(environment.userRole) !== null) {
        this.router.navigate(['user']);
      } else {
        this.router.navigate(['']);
      }
    }
  }

}

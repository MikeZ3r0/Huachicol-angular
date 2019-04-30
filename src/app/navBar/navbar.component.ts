import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  public sesion: boolean;
  public BotonPrincipal;
  public opcion1;
  public opcion2;
  public opcion3;

  constructor(private loginService: LoginService, private router: Router) {
    this.sesion = false;
    this.BotonPrincipal = 'Login';
    this.opcion1 = 'Iniciar sesión';
    this.opcion2 = 'Registrarse';
    this.opcion3 = 'Finalizar sesión';
  }

  ngOnInit(): void {
    if (this.loginService.obtenerToken() === null) {
      this.sesion = false;
    } else {
      this.sesion = true;
    }
  }

  finalizarSesion() {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}

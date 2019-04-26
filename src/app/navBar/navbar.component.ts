import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  public sesion: boolean;
  public BotonPrincipal;
  public opcion1;
  public opcion2;

  constructor(){
    this.sesion = false;
    this.BotonPrincipal = 'Login';
    this.opcion1 = 'Iniciar sesión';
    this.opcion2 = 'Registrarse';
  }
}

import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public sesion: boolean;

  public BotonPrincipal: string;

  constructor(private loginService: LoginService) {
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
}

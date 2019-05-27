import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import para usar bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import para uso de login
import { HttpClientModule} from '@angular/common/http';
import {LoginService} from './login/login.service';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent} from './navBar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MapaComponent } from './mapa/mapa.component';

// Import ngx-twitter-timeline
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

import { FormsModule }   from '@angular/forms';


import { ServiciosComponent } from './servicios/servicios.component';
import { RealizarDenunciaComponent } from './modal/realizar-denuncia/realizar-denuncia.component';
import { MostrarDenunciaComponent } from './modal/mostrar-denuncia/mostrar-denuncia.component';

import {MostrarDenunciaService} from './modal/mostrar-denuncia/mostrar-denuncia.service';
import {RealizarDenunciaService} from './modal/realizar-denuncia/realizar-denuncia.service';

import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MapaComponent,
    routingComponents,
    ServiciosComponent,
    RealizarDenunciaComponent,
    MostrarDenunciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    // Specify library as an import
    NgxTwitterTimelineModule
  ],
  providers: [LoginService, MostrarDenunciaService, RealizarDenunciaService,  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

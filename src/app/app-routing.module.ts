import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {root} from 'rxjs/internal-compatibility';

import {AuthGuard} from './login/auth.guard';
import {AdministradorComponent} from './administrador/administrador.component';
import {PrincipalComponent} from './principal/principal.component';
import {ServiciosComponent} from './servicios/servicios.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'admin', component: AdministradorComponent, canActivate: [AuthGuard]},
  { path: 'user', component: ServiciosComponent, canActivate: [AuthGuard]},
  { path: 'home', component: PrincipalComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PrincipalComponent, AdministradorComponent, ServiciosComponent];

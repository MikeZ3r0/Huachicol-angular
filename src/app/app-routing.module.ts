import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import {NavbarComponent} from './navBar/navbar.component';
import {AuthGuard} from './login/auth.guard';

const routes: Routes = [
  { path: '', component: NavbarComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

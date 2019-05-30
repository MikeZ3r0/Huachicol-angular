import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Denuncia} from '../../denuncia';
import {NgForm } from '@angular/forms';

import {RealizarDenunciaService} from './realizar-denuncia.service';
import {DatePipe} from '@angular/common';
import {formatDate} from '@angular/common';

import {Router} from '@angular/router';


@Component({
  selector: 'app-realizar-denuncia',
  templateUrl: './realizar-denuncia.component.html',
  styleUrls: ['./realizar-denuncia.component.css']
})
export class RealizarDenunciaComponent implements OnInit {
  closeResult: string;
  model: Denuncia;
  denuncia: Denuncia;
  sesion: boolean;



  constructor(
    private modalService: NgbModal, public realizarDenunciaService: RealizarDenunciaService,
    private router: Router, public datePipe: DatePipe) {
      this.sesion = false;
      this.model = new Denuncia('Robo de combustible', 'Gente cavando');
  }

  ngOnInit() {
    const token = this.realizarDenunciaService.getToken();
    if (!token) {
      this.router.navigate(['']);
    }
    this.sesion = true;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;


    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  onSubmit(f: NgForm) {
    console.log('entre a denuncia');
    console.log(f.value);
    const today = new Date();
    // const date = this.datePipe.transform(today, 'yyyy-MM-dd'T'HH:mm:ss.SSSZ');
    const date = formatDate(today, "yyyy-MM-dd'T'HH:mm:ss.mmmZ", 'en');
    console.log('datesss: ' + date);
    this.denuncia = new Denuncia(f.value.titulo, f.value.descripcion,
      new Date(date) , {x: 99.1468518, y: 19.5046539, coordinates: [-99.1468518, 19.5046539], type: 'Point'}, '1');
    this.realizarDenunciaService.setDenuncia(this.denuncia).subscribe( datos => {
        const dato = datos;
        console.log('denuncias ' + dato);
      }, err => {

        console.error(err);
        /*const messageError = JSON.stringify(err.error.error);
        console.log(messageError + ' = ' + environment.invalidToken + ' : ');
        console.log(messageError.match(environment.invalidToken));
        if (messageError.match(environment.invalidToken) !== null) {
          console.log('Token invalido: ' + environment.invalidToken);
          localStorage.removeItem('userAuth');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.router.navigate(['']);*/
      }
    );

    /*f.reset();*/
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

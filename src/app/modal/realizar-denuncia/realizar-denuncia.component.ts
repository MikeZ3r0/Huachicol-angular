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
  descriptions;
  titles;



  constructor(
    private modalService: NgbModal, public realizarDenunciaService: RealizarDenunciaService,
    private router: Router, public datePipe: DatePipe) {
      this.sesion = false;
      this.model = new Denuncia('', '');
      this.descriptions = new Array();
      this.titles = new Array();
      this.descriptions.push("Robo en ducto");
      this.descriptions.push("Incendio en ducto");
      this.descriptions.push("Gente cavando");
      this.descriptions.push("Disturbios en la zona");
      this.descriptions.push("Fuga");
      this.titles.push("Robo de combustible");
      this.titles.push("Incendio");
      this.titles.push("Fuga");

  }

  ngOnInit() {
    const token = this.realizarDenunciaService.getToken();
    if (!token) {
      this.router.navigate(['']);
    }
    this.sesion = true;
    console.log(this.descriptions);
    console.log(this.titles);
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
    const userName = localStorage.getItem('userName');
    const lat = document.getElementById("lat").value;
    const lng = document.getElementById("lng").value;
    this.denuncia = new Denuncia(f.value.title, f.value.description,
      new Date(date) , {x:lat , y: lng, coordinates: [lat,lng], type: 'Point'}, userName);
    this.realizarDenunciaService.setDenuncia(this.denuncia).subscribe( datos => {
        const dato = datos;
        console.log('denuncias ' + dato);
        this.sesion = true;
        document.getElementById("mensaje").innerHTML = "<div class='alert alert-success alert-dismissible fade show'><strong>Todo salio bien!</strong> Denuncia exitosa.<button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
      }, err => {
        console.error(err);
        document.getElementById("mensaje").innerHTML = "<div class='alert alert-warning alert-dismissible fade show'><strong>ERROR!</strong>"+err +"<button type='button' class='close' data-dismiss='alert'>&times;</button></div>";
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
    this.router.navigate(['user']);

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

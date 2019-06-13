import { Component, OnInit } from '@angular/core';
import {Denuncia} from '../../denuncia';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import {MostrarDenunciaService} from './mostrar-denuncia.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-mostrar-denuncia',
  templateUrl: './mostrar-denuncia.component.html',
  styleUrls: ['./mostrar-denuncia.component.css']
})
export class MostrarDenunciaComponent implements OnInit {
  closeResult: string;
  denuncia: Denuncia;
  denuncias;
  token;
  datos;
  sesion: boolean;
  vacio: boolean;

  constructor(private modalService: NgbModal, private mostrarDenunciaService: MostrarDenunciaService, private router: Router) {
    this.sesion = false;
    this.vacio=true;
  }

  ngOnInit() {
    this.denuncias = new Array();
    const token = this.mostrarDenunciaService.getToken();
    if (token === null) {
      this.router.navigate(['']);
    }
    this.sesion = true;
    this.getDenuncia();
  }

  getDenuncia() {
    this.mostrarDenunciaService.getDenuncia().subscribe( datos => {
      this.datos = datos;
      const denunciaString = JSON.stringify(this.datos);
      const denunciaJSON = JSON.parse(denunciaString);
      if(denunciaJSON.length!=null){
        this.vacio=false;
        for (let i = 0; i < denunciaJSON.length; i++) {
          this.denuncia = new Denuncia(denunciaJSON[i].titulo, denunciaJSON[i].descripcion, denunciaJSON[i].sendDate,
            denunciaJSON[i].punto.coordinates,  denunciaJSON[i].email, denunciaJSON[i]._id);
          this.denuncias.push(this.denuncia);
        }
      }else{
        this.vacio=true;
      }

    }, (err: any) => {
      const messageError = JSON.stringify(err.error.error);
      console.log(messageError + ' = ' + environment.invalidToken + ' : ');
      console.log(messageError.match(environment.invalidToken));
      if (messageError.match(environment.invalidToken) !== null) {
        console.log('Token invalido: ' + environment.invalidToken);
        localStorage.removeItem('userAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['']);
      }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('mostrar denunucias' + this.datos);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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

import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgForm } from '@angular/forms';
import {Usuario} from '../usuario';
import {RegistroUsuarioService} from './registro-usuario.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  public closeResult: string;
  public usuario:Usuario;
  public usuarioModel: Usuario;
  public sesion: boolean;

  constructor(private modalService: NgbModal,public registrarUsuarioService: RegistroUsuarioService, private router: Router ) {
    this.sesion = false;
    this.usuarioModel = new Usuario('', '', 445558839, '',[{profileName: "CIUDADANO_ROLE"}]);
  }

  ngOnInit() {
  }

  open(registroUsuario) {
    this.modalService.open(registroUsuario, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  onSubmit(usuario : NgForm){
    console.log(usuario.value.nombre);
    this.usuario = new Usuario (usuario.value.nombre, usuario.value.username, 5546435654, usuario.value.password, [{profileName: "CIUDADANO_ROLE"}]);
    console.log(this.usuario);
    this.registrarUsuarioService.setUsuario(this.usuario).subscribe(datos =>{
      console.log('usuario '+ datos);
    }, err => {
      console.error(err);
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

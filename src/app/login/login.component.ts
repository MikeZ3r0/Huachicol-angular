import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {
  data;

  constructor(private modalService: NgbModal, private loginService: LoginService) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' });
  }

  ngOnInit() {
  }

  logIn(user, pass, event) {
    event.preventDefault();
    console.log(user);
    console.log(pass);
    this.loginService.log(user, pass).subscribe(datos => {
      this.data = datos;
      console.log(this.data);
      localStorage.setItem( 'userAuth', JSON.stringify(this.data));
      return;
    });
  }
}

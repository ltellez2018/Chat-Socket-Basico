import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';
  constructor(public websocketService: WebsocketService,
              private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
     this.websocketService.loginWebSocket(this.nombre)
       .then(() => {
          this.router.navigateByUrl('/mensajes');
       }).catch( (error) => {
         console.error(error);
       });

  }

}

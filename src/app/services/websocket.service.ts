import { Injectable } from '@angular/core';
// * NGX-Socket-io
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;
  constructor(private socket: Socket,
              private router: Router) {
    this.cargarStorage();
    this.checkStatus();
   }

  checkStatus() {
    // * OBSERVABLES
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // **************************************************** //
  // ***       'Trigering event to serve'             *** //
  // **************************************************** //
  emit( event: string, payload?: any, callback?: Function ) {
    console.log('Emitiendo', event);
    this.socket.emit(event, payload, callback);

  }


 // **************************************************** //
 // ***         'Listening any events'               *** //
 // **************************************************** //
  listen( event: string ) {
    return this.socket.fromEvent( event );
  }

  loginWebSocket( nombre: string) {
    return new Promise( (resolve, reject) => {
      this.emit( 'configurar-usuario' , {nombre} , (resp: any) => {
        this.usuario = new Usuario (nombre);
        this.guardarStorage();
        resolve();
      });

    });
  }

  // **************************************************** //
  // ***           'Logout '    *** //
  // **************************************************** //

  logoutWs() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('/');
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario') ) {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.loginWebSocket(this.usuario.nombre);
    }
  }

  

}

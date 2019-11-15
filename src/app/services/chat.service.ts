import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {



  constructor(public websocketService: WebsocketService) { }

  sendMessage( message: string ) {
    const payload = {
        de: this.websocketService.usuario.nombre,
        cuerpo: message
    };

    this.websocketService.emit('mensaje', payload);
  }

  getMessages() {
    return this.websocketService.listen('mensaje-nuevo');
  }

  getMessagesPrivate() {
    return this.websocketService.listen('mensaje-privado');
  }
  
  
  getUsuariosActivos() {
    return this.websocketService.listen('usuarios-activos');
  }

  emitirUsuariosActivos() {
    return this.websocketService.emit('usuarios-conectados');
   
  }
}

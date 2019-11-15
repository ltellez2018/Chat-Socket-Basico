import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

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

}

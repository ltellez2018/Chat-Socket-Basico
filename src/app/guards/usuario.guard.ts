import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(public websocketService: WebsocketService,
              private router: Router) {

  }

  canActivate() {
    if ( this.websocketService.getUsuario()) {
        return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}

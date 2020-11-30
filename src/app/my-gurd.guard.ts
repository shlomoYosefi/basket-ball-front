import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SarveOfGurdService } from './sarve-of-gurd.service';

@Injectable({
  providedIn: 'root'
})
export class MyGurdGuard implements CanActivate {
  constructor(private srv: SarveOfGurdService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.srv.getLogIn()) {
      return true;
    }
    else {
      return false
    }
  }

}

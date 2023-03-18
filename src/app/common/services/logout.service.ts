import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private logoutSource = new Subject();
  isLogged$ = this.logoutSource.asObservable();

  checkLogged() {
    this.logoutSource.next();
  }

  logout() {
    localStorage.removeItem(environment.tokenName)
    this.checkLogged();
  }
}

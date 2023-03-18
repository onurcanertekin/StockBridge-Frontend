import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotifyDto } from '../dtos/notify.dto';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private logoutSource = new Subject();
  isLogged$ = this.logoutSource.asObservable();

  constructor(private notifyService: NotifyService) { }

  checkLogged() {
    this.logoutSource.next();
  }

  logout() {
    let counter = 1;
    this.notifyService.notify(<NotifyDto>{ isSuccess: true, message: `Logging out in ${counter + 1} seconds`, title: "Logging Out" });
    const intervalId = setInterval(() => {
      if (counter > 0) {
        this.notifyService.notify(<NotifyDto>{ isSuccess: true, message: `Logging out in ${counter} seconds`, title: "Logging Out" });
        counter--;
      } else {
        localStorage.removeItem(environment.tokenName)
        this.checkLogged();
        clearInterval(intervalId);
        this.notifyService.notify(<NotifyDto>{ isSuccess: true, message: `Succesfully Logged Out. Redirecting...`, title: "Logging Out" });
        setTimeout(() => {
          this.notifyService.closeNotify();
        }, 1000);
      }
    }, 1000);
  }
}

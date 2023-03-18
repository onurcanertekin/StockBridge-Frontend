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

  /** Notify all source subcribers to logged status must check  */
  checkLogged() {
    this.logoutSource.next();
  }

  /** On Logout, 2 second countdown will start, then when its end new message will display to user for 1 second. Then users token will be removed from localStorage.  */
  logout() {
    let counter = 1;
    this.notifyService.notify(<NotifyDto>{ isSuccess: true, message: `Logging out in ${counter + 1} seconds`, title: "Logging Out" });
    const intervalId = setInterval(() => {
      if (counter > 0) {

        /** Show user to countdown  */
        this.notifyService.notify(<NotifyDto>{ isSuccess: true, message: `Logging out in ${counter} seconds`, title: "Logging Out" });
        counter--;
      } else {
        localStorage.removeItem(environment.tokenName)
        this.checkLogged();

        /** Intervals must clear, because they will work always until cleared  */
        clearInterval(intervalId);
        this.notifyService.notify(<NotifyDto>{ isSuccess: true, message: `Succesfully Logged Out. Hold On...`, title: "Logging Out" });
        setTimeout(() => {
          this.notifyService.closeNotify();
        }, 1000);
      }
    }, 1000);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyDto } from '../dtos/notify.dto';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private notifySource = new Subject<NotifyDto>();
  notify$ = this.notifySource.asObservable();
  private closeNotifySource = new Subject();
  closeNotify$ = this.closeNotifySource.asObservable();

  /** Notify all source subcribers to notify event just fired  */
  notify(notify: NotifyDto) {
    this.notifySource.next(notify);
  }

  /** Notify all source subcribers to close notify event just fired  */
  closeNotify() {
    this.closeNotifySource.next();
  }
}

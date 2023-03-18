import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyDto } from '../dtos/notify.dto';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private notifySource = new Subject<NotifyDto>();
  notify$ = this.notifySource.asObservable();

  notify(notify: NotifyDto) {
    this.notifySource.next(notify);
  }
}

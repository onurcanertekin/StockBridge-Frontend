import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketMessageRequestDto } from '../dtos/websocket-message.dto';
import { SocketMessageType } from '../enums/socket-message-type.enum';
import { LogoutService } from './logout.service';
;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject!: AnonymousSubject<MessageEvent>;
  public messages!: Subject<WebSocketMessageRequestDto>;

  constructor(private logoutService: LogoutService) { }

  initializeSocket() {
    const token = localStorage.getItem(environment.tokenName)
    if (!!token)
      this.messages = <Subject<WebSocketMessageRequestDto>>this.connect(`${environment.remoteWsUri}/?${token}`).pipe(
        map(
          (response: MessageEvent): WebSocketMessageRequestDto => {
            return response.data;
          }
        )
      );
  }
  private connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = (message: MessageEvent<WebSocketMessageRequestDto>) => this.onMessage(obs, message);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = <any>{
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }

  private onMessage(obs: Observer<MessageEvent>, message: MessageEvent<WebSocketMessageRequestDto>): any {
    console.log("new message:", message.data);
    if (message && message.data && message.data.messageType == SocketMessageType.LogOff) {
      this.logoutService.logout();
    }
    return obs.next.bind(obs)
  }
}

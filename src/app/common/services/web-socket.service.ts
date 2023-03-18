import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketMessageRequestDto, WebSocketResponseDto } from '../dtos/websocket-message.dto';
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

  /** initialize and open web socket connection if current user has token in local storage  */
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

  /** Check and if not initialized create web socket subject  */
  private connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  /** Create event controlled web socket and return observer and observable  */
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
      next: (data: WebSocketResponseDto) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
          console.log('Message sent to websocket: ', data);
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }

  /** If web socket send log off request, current user will be forced to log out and return response */
  private onMessage(obs: Observer<MessageEvent>, message: MessageEvent<WebSocketMessageRequestDto>): any {
    if (message && message.data && message.data.messageType == SocketMessageType.LogOff) {
      this.logoutService.logout();
      const response = <WebSocketResponseDto>{ messageType: message.data.messageType, timeStamp: new Date() };
      const event = new MessageEvent('message', { data: response });
      this.subject.next(event);
    }
    return obs.next.bind(obs)
  }
}

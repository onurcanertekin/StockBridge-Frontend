import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/common/dtos/login.dto';
import { NotifyDto } from 'src/app/common/dtos/notify.dto';
import { ApiStatus } from 'src/app/common/enums/api-status.enum';
import { LogoutService } from 'src/app/common/services/logout.service';
import { NotifyService } from 'src/app/common/services/notify.service';
import { WebSocketService } from 'src/app/common/services/web-socket.service';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Component({
  selector: 'in-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  environment = environment;

  errorOnLogin: string | null = null;

  login: LoginDto = <LoginDto>{
    email: "",
    password: "",
  };

  constructor(private loginService: LoginService,
    private logoutService: LogoutService,
    private notifyService: NotifyService,
    private webSocketService: WebSocketService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    //prevent default event
    event.preventDefault();
    this.loginService.authorize(this.login).subscribe((res) => {
      if (res && res.status == ApiStatus.Ok && res.data.token) {
        localStorage.setItem(environment.tokenName, res.data.token);
        this.webSocketService.initializeSocket();
        this.handleLogin(null);
        this.router.navigate(["/welcome"]);
      }
      else if (res.status == ApiStatus.Error) {
        this.handleLogin(res.error);
      }
      else {
        this.handleLogin("An error raised");
      }
    }, (err) => {
      this.handleLogin("An error raised");
    });
  }

  handleLogin(message: string | null) {
    if (message)
      this.notifyService.notify(<NotifyDto>{
        isSuccess: !message,
        message: message
      })
    this.errorOnLogin = message;
    this.logoutService.checkLogged();
  }
}

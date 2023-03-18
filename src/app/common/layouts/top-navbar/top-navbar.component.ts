import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LogoutService } from '../../services/logout.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'in-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  environment = environment;
  constructor(private logoutService: LogoutService,
    private webSocketService: WebSocketService,
    private router: Router) {
  }

  ngOnInit() {
    this.webSocketService.initializeSocket();
    this.logoutService.isLogged$.subscribe(() => {
      this.checkLogged();
    });
    this.checkLogged();
  }

  /** To handle conditional tasks by user's logged status  */
  checkLogged() {
    //Check if token exist in local storage
    const token = localStorage.getItem(environment.tokenName);
    this.isLoggedIn = !!token;
  }

  /** Fires when user click Login button, navigate user to login page  */
  loginClick(event: Event) {
    event.preventDefault();
    this.router.navigate(["/login"])
  }

  /** Fires when user click Logout button, fire a event to logoutService's subcription  */
  logoutClick(event: Event) {
    event.preventDefault();
    this.logoutService.logout();
  }
}

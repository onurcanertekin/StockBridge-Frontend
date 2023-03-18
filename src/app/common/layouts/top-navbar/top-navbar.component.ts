import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'in-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  environment = environment;
  constructor(private logoutService: LogoutService,
    private router: Router) {
  }

  ngOnInit() {
    this.logoutService.isLogged$.subscribe(() => {
      this.checkLogged();
    });
    this.checkLogged();
  }
  checkLogged() {
    //Check if token exist in local storage
    const token = localStorage.getItem(environment.tokenName);
    this.isLoggedIn = !!token;
  }

  loginClick(event: Event) {
    event.preventDefault();
    this.router.navigate(["/login"])
  }
  logoutClick(event: Event) {
    event.preventDefault();
    this.logoutService.logout();
  }
}

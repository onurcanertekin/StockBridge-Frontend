import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'in-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  environment = environment;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  loginClick() {
    this.router.navigate(["/login"])
  }
}

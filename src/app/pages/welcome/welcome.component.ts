import { Component, OnInit } from '@angular/core';
import { ApiStatus } from 'src/app/common/enums/api-status.enum';
import { environment } from 'src/environments/environment';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'in-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [WelcomeService]
})
export class WelcomeComponent implements OnInit {

  constructor(private welcomeService: WelcomeService) { }

  ngOnInit() {
    this.getGreeting();
  }
  getGreeting() {
    if (localStorage.getItem(environment.tokenName))
      this.welcomeService.getGreetings().subscribe(res => {
        if (res && res.status == ApiStatus.Ok && res.data) {

        }
      });
  }
}

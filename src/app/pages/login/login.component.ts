import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiStatus, LoginResponseDto } from './login-response.dto';
import { LoginDto } from './login.dto';
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

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(event: Event) {
    //prevent default event
    event.preventDefault();

    this.loginService.authorize(this.login).subscribe((res) => {
      const loginResponse = res as LoginResponseDto;
      if (loginResponse && loginResponse.status == ApiStatus.Ok && loginResponse.data.token) {
        localStorage.setItem(environment.tokenName, loginResponse.data.token);
        this.errorOnLogin = null;
        this.router.navigate(["/welcome"]);
      }
      else if (loginResponse.status == ApiStatus.Error) {
        this.errorOnLogin = loginResponse.error
        localStorage.removeItem(environment.tokenName);
      }
      else {
        this.errorOnLogin = "An error raised"
        localStorage.removeItem(environment.tokenName);
      }
    }, (err) => {
      this.errorOnLogin = "An error raised"
    });
  }

}

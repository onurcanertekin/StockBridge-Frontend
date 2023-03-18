import { Injectable } from '@angular/core';
import { LoginDto } from './login.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  authorize(login: LoginDto) {
    return this.httpClient.post(`${environment.remoteUri}/Authorize`,
      login)
  }
}

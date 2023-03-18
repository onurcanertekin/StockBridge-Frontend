import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from 'src/app/common/dtos/login.dto';
import { environment } from 'src/environments/environment';
import { LoginResponseDto } from '../../common/dtos/login-response.dto';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  authorize(login: LoginDto) {
    return this.httpClient.post<LoginResponseDto>(`${environment.remoteUri}/Authorize`,
      login)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GreetingResponseDto } from 'src/app/common/dtos/greeting-response.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class WelcomeService {

  constructor(private httpClient: HttpClient) { }

  getGreetings() {
    let headers = new HttpHeaders({
      "x-user-token": localStorage.getItem(environment.tokenName) as string
    })
    return this.httpClient.get<GreetingResponseDto>(`${environment.remoteUri}/GetGreeting`, { headers: headers })
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.backApiUrl;
  
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  login(credentials: any) {
    const httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.httpClient.post(`${this.baseUrl}/login`, 
      "username=" + credentials.username + 
      "&password=" + credentials.password, 
      httpOptionsLogin)
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users`, user, this.httpOptions);
  }

  logout() {
    return this.httpClient.post(`${this.baseUrl}/logout`, this.httpOptions);
  }

}

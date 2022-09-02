import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtToken } from '../../classes/api/jwt-token';
import { AuthUser } from '../../classes/entities/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  env = environment;
  constructor( private http: HttpClient ) { }

  async loginAsync(body: AuthUser): Promise<JwtToken>{
    const token = this.http.post<JwtToken>(`${this.env.apiUrl}login`,body);
    return lastValueFrom(token);
  }
}

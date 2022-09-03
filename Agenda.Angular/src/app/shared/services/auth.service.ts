import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtToken } from '../classes/api/jwt-token';
import { AuthUser } from '../classes/entities/auth-user';
import jwtDecode from 'jwt-decode';
import { TokenProps } from '../classes/auth/token-props';

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
  
  setToken(token: string): void {
    const { role } = jwtDecode(token) as TokenProps;
    window.localStorage.setItem("@token", token);
    window.localStorage.setItem("@role", role);
  }

  clearToken(): void {
    window.localStorage.removeItem("@token");
    window.localStorage.removeItem("@role");
  }

  getToken(): string | null{
    return window.localStorage.getItem("@token");
  }

  getRole(): string | null{
    return window.localStorage.getItem("@role");
  }
}

import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiBaseResponse } from '../classes/api/api-base-response';
import { Contact } from '../classes/entities/contact';
import { QueryParams } from '../classes/params/query-params';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService<T> {

  env = environment

  constructor(
    @Inject("route") protected route: string,
    private http: HttpClient) { }


  public GetAsync(queryParams = new QueryParams()):Promise<ApiBaseResponse<T>> {
    const page = this.http.get<ApiBaseResponse<T>>(`${this.env.apiUrl}${this.route}`,{params:queryParams}) 
    return lastValueFrom(page)
  }

}

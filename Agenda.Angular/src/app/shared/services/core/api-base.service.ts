import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiBaseResponse } from '../../classes/api/api-base-response';
import { QueryParams } from '../../classes/params/query-params';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService<T> {

  env = environment

  constructor(
    @Inject("route") protected route: string,
    protected http: HttpClient) { }

  public GetAsync(queryParams = new QueryParams()):Promise<ApiBaseResponse<T>> {
    const page = this.http.get<ApiBaseResponse<T>>(`${this.env.apiUrl}/${this.route}`,{params:queryParams}) 
    return lastValueFrom(page)
  }

}

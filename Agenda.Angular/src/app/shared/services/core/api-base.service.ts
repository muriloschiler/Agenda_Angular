import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaginationResponse } from '../../classes/api/api-pagination-response';
import { QueryParams } from '../../classes/params/query-params';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService<T> {

  env = environment

  constructor(
    @Inject("route") protected route: string,
    protected http: HttpClient) { }

  public GetAsync(queryParams = new QueryParams()):Promise<ApiPaginationResponse<T>> {
    const page = this.http.get<ApiPaginationResponse<T>>(`${this.env.apiUrl}/${this.route}`,{params:queryParams}) 
    return lastValueFrom(page)
  }

  public GetByIdAsync(id:number):Promise<T> {
    const entity = this.http.get<T>(`${this.env.apiUrl}/${this.route}/${id}`) 
    return lastValueFrom(entity)
  }

  createAsync(data: T): Promise<T> {
    const body = Object.assign(data, {});
    let response = this.http.post<T>(`${this.env.apiUrl}/${this.route}`, body);
    return lastValueFrom(response);
  }

  updateAsync(data: T, id: number): Promise<T> {
    const body = Object.assign(data, {})
    let response = this.http.put<T>(`${this.env.apiUrl}/${this.route}/${id}`,body);
    return lastValueFrom(response);;
  }

  deleteAsync(id: number): Promise<T> {
    let response = this.http.delete<T>(`${this.env.apiUrl}/${this.route}/${id}`)
    return lastValueFrom(response)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ReducedUser } from '../classes/entities/user/reduced-user';
import { User } from '../classes/entities/user/user';
import { ApiBaseService } from './core/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService<User>{

  constructor(
    protected override http: HttpClient
  ) {
    super('admin/user',http);
  }

  public getReducedUsers():Promise<ReducedUser[]>{
    const reducedUsers = this.http.get<ReducedUser[]>(`${this.env.apiUrl}/${this.route}`) 
    return lastValueFrom(reducedUsers)
  }

}

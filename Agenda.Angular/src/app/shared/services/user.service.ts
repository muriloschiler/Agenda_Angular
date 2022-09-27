import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Enumeration } from '../classes/entities/core/enumeration';
import { ReducedUser } from '../classes/entities/user/reduced-user';
import { ReportUser } from '../classes/entities/user/report-user';
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
    const reducedUsers = this.http.get<ReducedUser[]>(`${this.env.apiUrl}/${this.route}/reduced-users`) 
    return lastValueFrom(reducedUsers)
  }

  public getReportUsers():Promise<ReportUser[]>{
    const reportUsers = this.http.get<ReportUser[]>(`${this.env.apiUrl}/${this.route}/report-users`)
    return lastValueFrom(reportUsers)
  }

  getUserRoles(): Promise<Enumeration[]> {
    const userRoles =  this.http.get<Enumeration[]>(`${this.env.apiUrl}/${this.route}/user-roles`);
    return lastValueFrom(userRoles);
  }

}

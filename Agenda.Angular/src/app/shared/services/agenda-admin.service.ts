import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AdminContact } from '../classes/entities/admin-contact';
import { Enumeration } from '../classes/entities/core/enumeration';
import { ApiBaseService } from './core/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaAdminService extends ApiBaseService<AdminContact>{

  constructor(
    protected override http: HttpClient
  ) {
    super('admin/contact',http);
  }

  public getPhoneTypes():Promise<Enumeration[]> {
    const phoneTypes = this.http.get<Enumeration[]>(`${this.env.apiUrl}/${this.route}/phone-types`) 
    return lastValueFrom(phoneTypes)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminContact } from '../classes/entities/admin-contact';
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

}

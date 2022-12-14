import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Contact } from '../classes/entities/contact';
import { Enumeration } from '../classes/entities/core/enumeration';
import { ApiBaseService } from './core/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends ApiBaseService<Contact> {

  constructor(
    protected override http: HttpClient
  ) {
    super('contact',http);
  }

  public getPhoneTypes():Promise<Enumeration[]> {
    const phoneTypes = this.http.get<Enumeration[]>(`${this.env.apiUrl}/${this.route}/phone-types`) 
    return lastValueFrom(phoneTypes)
  }
}

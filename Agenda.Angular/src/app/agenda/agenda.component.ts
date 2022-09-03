import { Component, OnInit } from '@angular/core';
import { ApiBaseResponse } from '../shared/classes/api/api-base-response';
import { Contact } from '../shared/classes/entities/contact';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  page!: ApiBaseResponse<Contact>
  
  constructor() { }

  ngOnInit() {
  }

}

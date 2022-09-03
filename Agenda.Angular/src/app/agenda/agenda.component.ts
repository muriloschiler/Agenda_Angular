import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiBaseError } from '../shared/classes/api/api-base-error';
import { ApiBaseResponse } from '../shared/classes/api/api-base-response';
import { Contact } from '../shared/classes/entities/contact';
import { QueryParams } from '../shared/classes/params/query-params';
import { ContactServiceService } from '../shared/services/contact-service.service';
import { ErrorHandlerService } from '../shared/services/Error/error-handler.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  page!: ApiBaseResponse<Contact>
  
  constructor(
    private contactServiceService: ContactServiceService,
    private errorHandlerService: ErrorHandlerService,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.GetPageAsync
  }

  async GetPageAsync(params = new QueryParams()):Promise<void>{
    try {
      this.page = await this.contactServiceService.GetAsync();
    } catch (error) {
      this.errorHandlerService.apiErrorHandler(this.snackBar,error as ApiBaseError)
    }
  }

}

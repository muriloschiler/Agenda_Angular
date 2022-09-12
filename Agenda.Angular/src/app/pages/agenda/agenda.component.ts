import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from 'src/app/shared/components/modal/services/modal.service';
import { ApiBaseError } from '../../shared/classes/api/api-base-error';
import { ApiPaginationResponse } from '../../shared/classes/api/api-pagination-response';
import { Contact } from '../../shared/classes/entities/contact';
import { QueryParams } from '../../shared/classes/params/query-params';
import { ContactService } from '../../shared/services/contact.service';
import { ErrorHandlerService } from '../../shared/services/Error/error-handler.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  
  page!: ApiPaginationResponse<Contact>

  constructor(
    private contactService: ContactService,
    private errorHandlerService: ErrorHandlerService,
    private snackBar: MatSnackBar,
    private modalService: ModalService) { }

  async ngOnInit() {
    this.getPageAsync()
  }

  async getPageAsync(params = new QueryParams()):Promise<void>{
    try {
      this.page = await this.contactService.GetAsync();
    } catch (error) {
      this.errorHandlerService.apiErrorHandler(this.snackBar,error as ApiBaseError)
    }
  }

  async changePageAsync(event: PageEvent): Promise<void> {
    const params = {
      take: event.pageSize,
      skip: event.pageIndex * event.pageSize,
    } as QueryParams;
    await this.getPageAsync(params);
  }

  callAgendaFormModal(id:number){
    
  }
}

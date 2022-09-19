import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { ModalConfig } from 'src/app/shared/components/modal/classes/modal-config';
import { ModalService } from 'src/app/shared/components/modal/services/modal.service';
import { ApiBaseError } from '../../shared/classes/api/api-base-error';
import { ApiPaginationResponse } from '../../shared/classes/api/api-pagination-response';
import { Contact } from '../../shared/classes/entities/contact';
import { QueryParams } from '../../shared/classes/params/query-params';
import { AgendaService } from '../../shared/services/agenda.service';
import { ErrorHandlerService } from '../../shared/services/Error/error-handler.service';
import { AgendaFormData } from './classes/agenda-form-data';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  page: ApiPaginationResponse<Contact> = new ApiPaginationResponse<Contact>()

  constructor(
    private agendaService: AgendaService,
    private errorHandlerService: ErrorHandlerService,
    private snackBar: MatSnackBar,
    private modalService: ModalService) { }

  async ngOnInit() {
    this.getPageAsync()
  }

  async getPageAsync(params = new QueryParams()):Promise<void>{
    try {
      this.page = await this.agendaService.GetAsync();
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

  callAgendaFormModal(id?:number){
    const config = new ModalConfig<AgendaFormData,ContactFormComponent>();
    config.componentToRender = ContactFormComponent;
    config.title = `${id ? 'Editar' : 'Adicionar'} Contato`;
    config.icon = 'people';
    config.data = { id } as AgendaFormData;

    this.modalService.open(config);
    this.modalService.closed.subscribe(async (result) => {
      if (result) {
        await this.getPageAsync();
      }
    });
  }
}

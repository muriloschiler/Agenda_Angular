import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { config } from 'rxjs';
import { ApiBaseError } from 'src/app/shared/classes/api/api-base-error';
import { ApiPaginationResponse } from 'src/app/shared/classes/api/api-pagination-response';
import { User } from 'src/app/shared/classes/entities/user/user';
import { QueryParams } from 'src/app/shared/classes/params/query-params';
import { ConfirmModalConfig } from 'src/app/shared/components/confirm-modal/classes/confirm-modal-config';
import { ConfirmModalService } from 'src/app/shared/components/confirm-modal/services/confirm-modal.service';
import { ModalConfig } from 'src/app/shared/components/modal/classes/modal-config';
import { ModalService } from 'src/app/shared/components/modal/services/modal.service';
import { TableMenuOptions } from 'src/app/shared/components/table/classes/table-menu-options';
import { ErrorHandlerService } from 'src/app/shared/services/Error/error-handler.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserFormData } from './classes/user-form-data';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  page : ApiPaginationResponse<User> = new ApiPaginationResponse<User>();
  users!: User[];
  tableOptions!: TableMenuOptions;
  columns: any[] = [];

  constructor(
    private userService: UserService,
    private modalService:ModalService,
    private confirmModalService: ConfirmModalService,
    private router:Router,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    private errorHandlerService :ErrorHandlerService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.refreshTableAsync();
  }

  async refreshTableAsync(): Promise<void> {
    await this.getPageAsync();
    this.setTableConfig();
    this.setColumns();
    this.cdRef.detectChanges();
  }

  async getPageAsync(params = new QueryParams()):Promise<void>{
    try {
      this.page = await this.userService.GetAsync();
      this.users = this.page.data
    } catch (error) {
      this.errorHandlerService.apiErrorHandler(this.snackBar,error as ApiBaseError)
    }
  }

  setTableConfig(): void {
    this.tableOptions = {
      deleteAction: (id) => this.deleteUsersAsync(id),
      editAction: (id) => this.goToUsersForm(id),
    };
  }

  async deleteUsersAsync(id: number): Promise<void> {
    const config = {
      title: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir esse usuário?',
    } as ConfirmModalConfig;

    this.confirmModalService.open(config)
    this.confirmModalService.closed.subscribe(async (result) => {
      if (result) {
        await this.userService.deleteAsync(id);
        await this.refreshTableAsync();
      }
    });
  }

  async goToUsersForm(id?:number):Promise<void> {
    const config = new ModalConfig<UserFormData,UserFormComponent>();
    config.data = {id} as UserFormData;
    config.title = `${id ? 'Atualizar' : 'Criar'} usuário`;
    config.icon = 'people';
    config.componentToRender = UserFormComponent;

    this.modalService.open(config);
    this.modalService.closed.subscribe(async result=>{
      if (result) {
        await this.refreshTableAsync()
      }
    })
  }
  goToUsersReportPage(){
    this.router.navigate(['dashboard/admin/users/report']);
  }

  setColumns(): void {
    this.columns = [
      ['id', 'ID'],
      ['name', 'NOME'],
      ['username', 'USERNAME'],
      ['email', 'E-MAIL'],
    ];
  }

  async changePageAsync(event: PageEvent): Promise<void> {
    const params = {
      take: event.pageSize,
      skip: event.pageIndex * event.pageSize,
    } as QueryParams;
    await this.getPageAsync(params);
  }
}


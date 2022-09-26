import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiBaseError } from 'src/app/shared/classes/api/api-base-error';
import { ApiPaginationResponse } from 'src/app/shared/classes/api/api-pagination-response';
import { User } from 'src/app/shared/classes/entities/user/user';
import { QueryParams } from 'src/app/shared/classes/params/query-params';
import { ConfirmModalService } from 'src/app/shared/components/confirm-modal/services/confirm-modal.service';
import { ModalService } from 'src/app/shared/components/modal/services/modal.service';
import { TableMenuOptions } from 'src/app/shared/components/table/classes/table-menu-options';
import { ErrorHandlerService } from 'src/app/shared/services/Error/error-handler.service';
import { UserService } from 'src/app/shared/services/user.service';

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
    console.log("Deletar Usuario");
    
  }

  async goToUsersForm(id?:number):Promise<void> {
    console.log("Setando a modal com user form");
    
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


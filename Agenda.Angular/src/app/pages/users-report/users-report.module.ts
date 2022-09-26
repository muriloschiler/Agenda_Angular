import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersReportComponent } from './users-report.component';
import { TableModule } from 'src/app/shared/components/table/table.module';



@NgModule({
  declarations: [UsersReportComponent],
  imports: [
    TableModule,
    CommonModule
  ],
  exports:[UsersReportComponent]
})
export class UsersReportModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersReportComponent } from './users-report.component';



@NgModule({
  declarations: [UsersReportComponent],
  imports: [
    CommonModule
  ],
  exports:[UsersReportComponent]
})
export class UsersReportModule { }

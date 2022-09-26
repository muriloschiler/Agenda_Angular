import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { ReportUser } from 'src/app/shared/classes/entities/user/report-user';
import { TableMenuOptions } from 'src/app/shared/components/table/classes/table-menu-options';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.scss']
})
export class UsersReportComponent implements OnInit {

  @ViewChild('content',{static:false}) el!:ElementRef;

  reportUsers!:ReportUser[];
  columns: any[] = [];
  
  constructor(
    private cdRef: ChangeDetectorRef,
    private userService:UserService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.refreshTableAsync();
  }

  async refreshTableAsync(): Promise<void> {
    await this.getReportAsync();
    this.setColumns();
    this.cdRef.detectChanges();
  }

  makePDF(){
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save("usersReport.pdf")
      }
    });
  }

  async getReportAsync(){
    this.reportUsers = await this.userService.getReportUsers();
  }

  setColumns(): void {
    this.columns = [
      ['id', 'Id'],
      ['name', 'Nome'],
      ['isAdmin', 'Administrador'],
      ['contactsCount', 'Quantidade de contatos'],
    ];
  }
  
}

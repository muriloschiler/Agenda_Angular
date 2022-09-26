import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Register } from '../../classes/entities/core/register';
import { TableMenuOptions } from './classes/table-menu-options';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit , OnChanges {

  @Input() menuOptions!:TableMenuOptions;
  @Input() columns: any[][] = [];
  @Input() data: Register[] = [];
  
  dataSource!: MatTableDataSource<Register>;
  displayedColumns: string[] = [];

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges | this): void {
    if (changes.data) {
      this.refresh();
    }
  }

  refresh(): void {
    
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      this.getKeys(this.data);
    }
    this.cdRef.detectChanges();
  }

  getKeys(data: any[]): void {
    if (data && data.length > 0) {
      this.displayedColumns = this.columns.map(c => c[0])
      if(this.menuOptions != null){
        this.displayedColumns = this.displayedColumns.concat(['actions']);
      }
    }
  }

  onEdit(id: number): void {
    if(this.menuOptions != null){
      this.menuOptions.editAction(id);
      this.refresh();
    }
  }

  onDelete(id: number): void {
    if(this.menuOptions != null){
      this.menuOptions.deleteAction(id);
      this.refresh();
    }
  }

}

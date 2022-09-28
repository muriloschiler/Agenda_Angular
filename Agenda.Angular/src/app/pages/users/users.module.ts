import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmModalModule } from 'src/app/shared/components/confirm-modal/confirm-modal.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormModule } from './user-form/user-form.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserFormModule,
    ModalModule,
    TableModule,
    SearchInputModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    ConfirmModalModule,
    MatIconModule,
    MatPaginatorModule,
  ]
})
export class UsersModule { }

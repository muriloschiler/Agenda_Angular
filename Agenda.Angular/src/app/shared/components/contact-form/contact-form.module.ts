import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [ContactFormComponent],
  exports: [
    ContactFormComponent
  ],
})
export class ContactFormModule { }

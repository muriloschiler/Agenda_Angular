import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule
  ],
  declarations: [MainLayoutComponent]
})
export class MainLayoutModule { }

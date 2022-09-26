import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainLayoutModule } from './shared/main-layout/main-layout.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { AgendaModule } from './pages/agenda/agenda.module';
import { UsersModule } from './pages/users/users.module';
import { UsersReportComponent } from './pages/users-report/users-report.component';
import { UsersReportModule } from './pages/users-report/users-report.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    LoginModule,
    AgendaModule,
    UsersModule,
    UsersReportModule,
    MainLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

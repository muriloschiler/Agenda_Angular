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
import { AgendaModule } from './agenda/agenda.module';
import { ContactFormModule } from './shared/contact-form/contact-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    LoginModule,
    AgendaModule,
    MainLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ContactFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

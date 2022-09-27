import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaAdminComponent } from './pages/agenda-admin/agenda-admin.component';
import { AgendaAdminModule } from './pages/agenda-admin/agenda-admin.module';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersReportComponent } from './pages/users/users-report/users-report.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthAdminGuard } from './shared/guards/auth-admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpInterceptorService } from './shared/interceptors/http-interceptor.service';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {path:'agenda',component: AgendaComponent},
      {path:'home',component: HomeComponent},
      {
        path:'admin',
        canActivate:[AuthAdminGuard],
        children:[
          {path:'agenda',component:AgendaAdminComponent},
          {path:'users',component:UsersComponent},
          {path:'users/report',component:UsersReportComponent}
        ]
      }
    ]
  },
  { path:'login', component: LoginComponent },
  { path:'**', redirectTo:'dashboard/home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ]
})
export class AppRoutingModule { }

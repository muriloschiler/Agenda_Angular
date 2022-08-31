import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: MainLayoutComponent,
    children:[
      {path:'home',component: HomeComponent}
    ]
  },
  { path:'login', component: LoginComponent },
  { path:'**', redirectTo:'dashboard/home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

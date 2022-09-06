import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../enums/user-roles';
import { AuthService } from '../services/auth.service';
import { NavbarItem } from './interface/navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items : NavbarItem[] = [];
  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.setBarItems();
  }

  setBarItems():void{
    this.items = [
      { name: 'Inicio', url: 'home', icon: 'home' },
      { name: 'Agenda', url: 'agenda', icon: 'people' }
    ];
    if(this.authService.getRole() == Roles.ADMIN){
      this.items.push(
        { name: 'Todos os Contatos', url: 'admin/agenda', icon: 'menu_book' },
        { name: 'Usuários', url: 'admin/users', icon: 'request_page' }
      )
    }
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['login'])
  }

}

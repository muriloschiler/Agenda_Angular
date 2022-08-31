import { Component, OnInit } from '@angular/core';
import { NavbarItem } from './interface/navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items : NavbarItem[] = [];
  constructor() { }

  ngOnInit() {
    this.setBarItems();
  }

  setBarItems():void{
    this.items = [
      {name:'Home', url:'home', icon:'home'}
    ]
  }

}

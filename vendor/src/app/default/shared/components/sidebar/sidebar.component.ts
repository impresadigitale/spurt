import { Component, OnInit } from '@angular/core';
import { menu } from './side-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItem: any;
  showMenu = 'Dashboard';
  showSubMenu = '';

  constructor() {}

  ngOnInit() {
    this.menuItem = menu;
  }

  openDropdown(event) {
    event.stopPropagation();
  }

  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  searchMenu(keyword) {
    this.menuItem = menu;
    this.menuItem = this.menuItem.filter(item => {
      return item.title.toLowerCase().includes(keyword);
    });
  }
}

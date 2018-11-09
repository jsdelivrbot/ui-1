import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLogged: boolean ;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedin') == 'true'){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean ;

  constructor(private route: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });

  if(localStorage.getItem('isLoggedin') == 'true'){
    this.isLogged = true;
  }
  else{
    this.isLogged = false;
  }
  }

  logout(){
    localStorage.removeItem('isLoggedin');
    location.reload();
    this.route.navigate(['login']);
  } 

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  public phonemask: Array<string | RegExp>;

  constructor(private router: Router, private message: DataServiceService) {
    this.phonemask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
   }

   userName= '';
   password = '';

   isLoggedin: boolean;


   redirect(){
     this.router.navigate(['/user']);
   }

   login(){
     if(this.userName == 'admin' && this.password == 'admin'){
       location.reload();
       this.router.navigate(['user/home']);
       this.message.success("the user is logged in");
       localStorage.setItem('isLoggedin', 'true');
     }
     else{
       this.message.error("entered wrong credentials");
     }
   }

  ngOnInit() {
    if(localStorage.getItem('isLoggedin') == "true"){
      this.isLoggedin = true;
    }
    else{
      this.isLoggedin = false;
    }
  }

}

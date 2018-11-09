import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DataServiceService {

  message = '';
  messageType = 'danger';

  user: any;

  constructor(private router:Router, private toastr: ToastrService ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.message = '';
      }
    });
   }

  public error(message) {
     this.message = message;
     this.toastr.error(message);
   }

   success(message){
     this.message = message;
     this.toastr.success(message);
   }

   warning(message){
     this.message = message;
     this.toastr.warning(message);
   }

}

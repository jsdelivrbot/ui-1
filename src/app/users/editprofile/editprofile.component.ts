import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  person: any;
  personid: any;

  constructor(private link: LocationStrategy, private activatedRoute: ActivatedRoute, private router: Router, private data: DataService, private rest: RestApiService) { 
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>this.personid=res['id']);
    this.getData();
    // this.activatedRoute.params.subscribe(res => {
    //   this.rest.get('')
    //   .then(this.data => {
    //     data['success']
    //   })
    // })
    console.log(this.person);
  }

  getData(){

    const data=this.rest.getData("http://localhost:8080/employee/"+this.personid);
    data.subscribe(res=>{console.log(res);this.person=res});
    console.log(this.person);
  }

  storeData()
  {
    const data = this.rest.putData("http://localhost:8080/employee/"+this.personid, this.person);
    data.subscribe(res=>console.log(res));
    this.router.navigate(["/user/employees"]);
  }

  // getData(){
  //   return this._http.get(this._url,  { headers: this.headers });
  // }

}

import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private dataService: DataService , private activatedRoute: ActivatedRoute , private router: Router, private rest: RestApiService) { }

  datas: Data[];
  message: any;
  async ngOnInit() {
    this.activatedRoute.params.subscribe(res=>this.message=res['data']);
    this.dataService.getData().subscribe((datas: Data[]) => {
      this.datas = datas;
      // console.log(this.datas);
    })
  }

  delete(id: any)
  {
    //alert('hi');
    if(confirm("Are you sure to delete?")) {
    this.rest.delete("http://localhost:8080/employee/"+id);
    this.router.navigate(["/user/employees"]);
    }

    //this.message="updated successfully";
  }

}

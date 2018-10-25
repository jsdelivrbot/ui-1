import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private dataService: DataService  ) { }

  datas: Data[];

  async ngOnInit() {
    this.dataService.getData().subscribe((datas: Data[]) => {
      this.datas = datas;
      // console.log(this.datas);
    })
  }

}

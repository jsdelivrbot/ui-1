import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { DataService } from '../data.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  person: any;
  personid: any;

  constructor(private link: LocationStrategy, private activatedRoute: ActivatedRoute, private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(res => {
    //   this.rest.get('')
    //   .then(this.data => {
    //     data['success']
    //   })
    // })
  }

}

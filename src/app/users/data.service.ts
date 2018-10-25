import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  _url = '/assets/people.json';

  constructor(private _http: HttpClient) { }

  getData(){
    return this._http.get(this._url);
  }
}

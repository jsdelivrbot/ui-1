import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  _url = 'http://localhost:8080/employee';
  _urlOptions = '/assets/dashboard.json';
  private headers = new HttpHeaders({'Accept': 'application/json' ,'Content-Type': 'application/json'});

  constructor(private _http: HttpClient) { }

  getData(){
    return this._http.get(this._url,  { headers: this.headers });
  }
  
    getOptions(){
    return this._http.get(this._urlOptions);
  }

  deletedata(id: any)
  {
    return this._http.delete(this._url+"/id", { headers: this.headers });
  }
}

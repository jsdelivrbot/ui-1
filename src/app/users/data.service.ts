import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  _url = 'http://localhost:8080/employee';
  private headers = new HttpHeaders({'Accept': 'application/json' ,'Content-Type': 'application/json'});

  constructor(private _http: HttpClient) { }

  getData(){
    return this._http.get(this._url,  { headers: this.headers });
  }

  deletedata(id: any)
  {
    return this._http.delete(this._url+"/id", { headers: this.headers });
  }
 
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class RestApiService {
  private headers = new HttpHeaders({'Accept': 'application/json' ,'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getHeaders(){
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(link, { headers: this.headers }).toPromise();
  }

  post(link: string, body: any){
    return this.http.post(link, JSON.stringify(body), { headers: this.headers }).toPromise();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  postForm(link: string, input1: any): Observable<any>{
    const req = new HttpRequest('POST',link, input1, {
  reportProgress: true,
  responseType: 'text'
}
);
       return this.http.request(req);
  }

}

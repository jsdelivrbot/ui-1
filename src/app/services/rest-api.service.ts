import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class RestApiService {

    // _baseUrl="http://34.214.138.186:8080/";
    _baseUrl="http://localhost:8080/";

  private headers = new HttpHeaders({'Accept': 'application/json' ,'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getHeaders(){
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(this._baseUrl+link, { headers: this.headers }).toPromise();
  }

  post(link: string, body: any){
    return this.http.post(this._baseUrl+link, JSON.stringify(body), { headers: this.headers }).toPromise();
  }

  delete(link: string){
    return this.http.delete(link,  { headers: this.headers });
  }

  postForm(link: string, input1: any): Observable<any>{
    const req = new HttpRequest('POST',this._baseUrl+link, input1, {
  reportProgress: true,
  responseType: 'text'
}
);
       return this.http.request(req);
  }

  getData(link: string)
  {
    return this.http.get(link, { headers: this.headers });
  }

  putData(link: string,  body: any)
  {
    return this.http.put(link, JSON.stringify(body), { headers: this.headers });
  }
  

}

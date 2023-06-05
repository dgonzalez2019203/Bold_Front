import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestDataService {

  public uri = "";

  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI;
  }
  
  private extractData(res:any){
    let body = res;
    return body || [] || {};
  }

  public getWebData(){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.get(this.uri+"getWebData",{headers:headers})
    .pipe(map(this.extractData));
  }

  //============================== USUARIO : ENDPOINT ==================
  public get(){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.get(this.uri+"users",{headers:headers})
    .pipe(map(this.extractData));
  }

  public save(data){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let params= JSON.stringify(data)

    return this.http.post(this.uri+"users",params,{headers:headers})
    .pipe(map(this.extractData));
  }

  public delete(id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.delete(this.uri+"users/"+id,{headers:headers})
    .pipe(map(this.extractData));
  }

    //============================== Phone : ENDPOINT ==================  
    public savePhone(data){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      })
      let params= JSON.stringify(data)
  
      return this.http.post(this.uri+"phone",params,{headers:headers})
      .pipe(map(this.extractData));
    }
  
    public deletePhone(user,phone){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      })
  
      return this.http.delete(this.uri+"phone/"+user+"/"+phone,{headers:headers})
      .pipe(map(this.extractData));
    }
}

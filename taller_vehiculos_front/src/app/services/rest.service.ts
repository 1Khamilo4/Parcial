import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url = 'http://localhost:8080/';

  constructor( public api:HttpClient ) { }

  public async Get( controller:String ){

    let result:any;

    await this.api.get(this.url+controller).toPromise().then((data)=>{
        result = data;
    });
    
    return result;
    
  }
}

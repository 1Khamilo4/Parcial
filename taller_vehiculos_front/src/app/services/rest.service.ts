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

  public async Post(controller:string, obj:any){

    let result:any;

    await this.api.post(this.url+controller, obj).toPromise().then(
      (res)=>{
        result = res;
      }
    );

    return result;

  }

  public async Put(controller:string, obj:any){
    
    let result:any;

    await this.api.put(this.url+controller+obj.id, obj).toPromise().then(
      (res)=>{
        result = res;
      }
    )

    return result;
  }

  public async Delete(controller:string, obj:any ){
    await this.api.delete(this.url+controller+obj.id).toPromise().then(
      (res)=>{
        console.log(res);
        
      }
    );
  }
}

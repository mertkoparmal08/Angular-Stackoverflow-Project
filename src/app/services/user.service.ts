import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  public user:any;


  constructor(private base:BaseService) {
    super(base.http);
  }

  // Kullanıcı oluşturma
  public createAccount(userObj:any)
   {
     return this.postReq('/users',userObj)
   }

   public getUser(email:string){
      return this.getReq('/users?email='+email)
   }
}
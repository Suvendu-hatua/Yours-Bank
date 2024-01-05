import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoginSuccessful:boolean=false;

  private userType:string ='none';
  constructor() { }

  setUserType(type:string){
    this.userType=type;
  }
  getUserType(){
    return this.userType;
  }


  setIsLoginSuccessful(data:boolean){
    this.isLoginSuccessful=data;
  }
  getISLoginSuccessful(){
    return this.isLoginSuccessful
  }
}

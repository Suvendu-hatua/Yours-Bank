import { Component } from '@angular/core';
import { LoginService } from './myservices/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Your's Bank";
  isLoginSuccessful:boolean |undefined
  constructor(private loginObj:LoginService){
    this.isLoginSuccessful=this.loginObj.getISLoginSuccessful();
    console.log(this.isLoginSuccessful);
    
  }
  
  ngOnInit(){
    this.isLoginSuccessful=this.loginObj.getISLoginSuccessful();
    console.log(this.isLoginSuccessful);
    
  }

  ngOnChanges(){
    this.isLoginSuccessful=this.loginObj.getISLoginSuccessful();
    console.log(this.isLoginSuccessful);
    
  }

  handleEvent(){
    console.log("Hello");
    
  }

}

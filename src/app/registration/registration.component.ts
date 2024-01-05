import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../myservices/customers.service';
import { Router } from '@angular/router';
import { LoginService } from '../myservices/login.service';
import { VWITS_Validation } from '../TypeScriptClasses/vwits_validation.validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private customerObj:CustomersService,private router:Router,private loginObj:LoginService) {

   }

   isLoginSuccessful:boolean|undefined;
   userType:string |undefined;
  formobj=new FormGroup(
    {
      name: new FormControl('',[Validators.required,Validators.minLength(4),VWITS_Validation.nameValidation]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phoneno:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      address: new FormControl("",[Validators.required]),
      country:new FormControl("",[Validators.required]),
      gender:new FormControl('',[Validators.required])
    },
  );
  ngOnInit(): void {
    this.isLoginSuccessful=this.loginObj.getISLoginSuccessful();
    this.userType=this.loginObj.getUserType();
    console.log("isLoginSuccessFul: "+this.loginObj.getISLoginSuccessful());
    console.log("User Type: "+this.loginObj.getUserType());
  }
  CustomerList:any=[];

  get f(){
    return this.formobj.controls;
  }
  
  submitForm(){
     console.log(this.formobj.value);
     this.customerObj.setCustomers(this.formobj.value);
     this.CustomerList=this.customerObj.getCustomers();
     alert("New Customer is added")
     this.formobj.reset();
    //  this.router.navigate(["/customer"])
  }
}

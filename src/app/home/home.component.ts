import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../myservices/login.service';
import { CustomersService } from '../myservices/customers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginObj: LoginService, private router: Router, private customerService: CustomersService) { }
  showAdminLogin: boolean = false;
  showCustomerLogin: boolean = false;

  ngOnInit(): void {
    this.isLoginSuccessful = this.loginObj.getISLoginSuccessful();
    this.userType = this.loginObj.getUserType();
    this.specificCustomer=this.customerService.getSpecificCustomer();
    // console.log(this.specificCustomer) 
    
  }
  clickAdminLogin() {
    this.showAdminLogin = true;
  }
  closeSignAdmin() {
    this.showAdminLogin = false;
  }



  emailId: string | undefined;
  password: string | undefined;
  cusEmail: string |undefined;
  cusPassword: string | undefined;
  userType: string | undefined;
  isLoginSuccessful: boolean | undefined;
  adminLogin() {
    // console.log(this.emailId);
    // console.log(this.password);
    if (this.emailId === "admin" && this.password === "admin") {
      this.showAdminLogin = false;
      alert("Successful admin login");
      this.loginObj.setUserType("admin");
      this.userType = this.loginObj.getUserType();

      this.loginObj.setIsLoginSuccessful(true);
      this.isLoginSuccessful = this.loginObj.getISLoginSuccessful();

      this.emailId='';
      this.password=''
      // this.router.navigateByUrl("registration")
    }
    else {
      alert("either emailId or password wrong!!")
    }
  }

  specificCustomer: any;
  customerLogin() {
    this.specificCustomer = this.customerService.getCustomers().filter((cus: any) => {
      return cus.email === this.cusEmail;
    })[0];
    
    // if(!this.specificCustomer){
    //   console.log("Hello");
      
    // }
    // console.log(this.specificCustomer);
    
    // this.specificCustomer = this.customerService.getSpecificCustomer();

    if (this.specificCustomer && this.specificCustomer.email === this.cusEmail && this.specificCustomer.password === this.cusPassword) {
      console.log(this.specificCustomer);
      this.customerService.setSpecificCustomer(this.specificCustomer);
      this.showCustomerLogin = false;
      alert("Successful Customer Login");
      this.loginObj.setUserType("customer");
      this.userType = this.loginObj.getUserType();

      this.loginObj.setIsLoginSuccessful(true);
      this.isLoginSuccessful = this.loginObj.getISLoginSuccessful();
      this.cusEmail='';
      this.cusPassword=''
    }
    else{
      alert("Either email id or passwor wrong!!")
    }



  }
  closeUserTypeLogin() {
    this.loginObj.setIsLoginSuccessful(false)
    this.isLoginSuccessful = this.loginObj.getISLoginSuccessful();
    this.loginObj.setUserType('none');
    this.userType = this.loginObj.getUserType();
    console.log(this.specificCustomer.name);
    
    console.log(this.userType);
  }
  closeSignCustomer() {
    this.showCustomerLogin = false;
  }
  clickCustomerLogin() {
    this.showCustomerLogin = true;
  }
}

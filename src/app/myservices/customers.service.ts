import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  generateId() {
    var myDate = new Date();
    var varID = myDate.getHours() + "" + myDate.getMinutes() + "" + myDate.getSeconds() + "" + myDate.getMilliseconds();
    if (varID.length > 15) {
      varID = varID.substring(0, 15);
    }
    return varID;
  }

   private CustomerList:any=[ //{
  //   name:"Suvendu Hatua",
  //   email:"suvendu@gmail.com",
  //   id:"2334456",
  //   amount:1200,
  //   address:"Samsara,Kalukhara,West Bengal",
  //   gender:"male",
  //   country:"india",
  //   password:"Suve@2023",
  //   phoneno:"8918382864"
  // },
  // {
  //   name:"Sonali Samanta",
  //   email:"sonali@gmail.com",
  //   id:"233776",
  //   amount:2000,
  //   address:"Gobardhanpur,Pingla,West Bengal",
  //   gender:"female",
  //   country:"india",
  //   password:"Sona@2023",
  //   phoneno:"8918382864"
  // } 
];
  
 private specificCustomer:any;

 setSpecificCustomer( data:any){
    this.specificCustomer=data;
 }

 getSpecificCustomer(){
  return this.specificCustomer
 }

  getCustomers(){
    console.log(this.CustomerList);
    return this.CustomerList;
  }

  //adding customers
  setCustomers(customerData:any){
    
    var customer={
      id:this.generateId(),
      amount:0,
      password: customerData.name.slice(0,4)+"@2023",
      ...customerData
    }
    this.CustomerList.push(customer);
    localStorage.setItem("customers",JSON.stringify(this.CustomerList));
  }

  //updating customer account balance
  addMoney(id:any,amount:number){
    this.CustomerList = this.CustomerList.map((cus: any) => {
      if (cus.id === id) {
        cus.amount +=(amount);
      }
      return cus;
    });
    localStorage.setItem("customers",JSON.stringify(this.CustomerList));
  }

  withdrawMoney(id:any,amount:number){
    this.CustomerList = this.CustomerList.map((cus: any) => {
      if (cus.id === id) {
        cus.amount -=amount;
      }
      return cus;
    });
    localStorage.setItem("customers",JSON.stringify(this.CustomerList));
  }

  
  constructor() { 
    let customers=localStorage.getItem("customers");
    customers=customers?JSON.parse(customers):[];  
    this.CustomerList=customers?customers:[];
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../myservices/customers.service';
import { TransactionsService } from '../myservices/transactions.service';
import { LoginService } from '../myservices/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VWITS_Validation } from '../TypeScriptClasses/vwits_validation.validator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerServiceObj: CustomersService, private trasactionObj: TransactionsService, private loginObj: LoginService) { }

  CustomerList: any = [];
  isAddMoney: boolean = false;
  isTransferMoney: boolean = false;
  isSuccessfulLogin: boolean | undefined;
  userType: string | undefined;

  specificCustomer: any;
  ngOnInit(): void {
    this.CustomerList = this.customerServiceObj.getCustomers();
    this.isSuccessfulLogin = this.loginObj.getISLoginSuccessful();
    this.userType = this.loginObj.getUserType();
    this.specificCustomer = this.customerServiceObj.getSpecificCustomer();
    console.log(this.specificCustomer);

    //  console.log(this.CustomerList);
  }

  senderAcno: string | undefined;
  senderName: string | undefined;
  handleClick1(id: string) {
    this.senderAcno = id;
    this.senderName = this.CustomerList.filter((cus: any) => {
      return cus.id === this.senderAcno;
    })[0].name;
    console.log(this.senderAcno);
    this.isAddMoney = true;

  }

  handleClick2(id: string) {
    this.senderAcno = id;
    this.senderName = this.CustomerList.filter((cus: any) => {
      return cus.id === this.senderAcno;
    })[0].name;
    this.isTransferMoney = true
  }
  
  formobj1=new FormGroup({
    amount:new FormControl('',[Validators.required,VWITS_Validation.amountValidation])
  })


  amountTobeAdded:any;
  addMoney() {
    this.amountTobeAdded=this.formobj1.value.amount;
    //calling addMoney function from Service
    this.customerServiceObj.addMoney(this.senderAcno,parseFloat(this.amountTobeAdded));

    const newTransaction = {
      senderAcno: this.senderAcno,
      senderName: this.senderName,
      amount: this.amountTobeAdded,
      type: "credit",
      time: new Date().toLocaleString()
    }
    this.trasactionObj.addTransactions(newTransaction);

    this.isAddMoney = false;
    // console.log(newTransaction);

    this.formobj1.reset();


  }

  get f(){
    return this.formobj1.controls;
  }

  formobj2=new FormGroup({
    accountno:new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]), 
    transferAmount: new FormControl('',[Validators.required,VWITS_Validation.amountValidation])
  });

  get f2(){
    return this.formobj2.controls;
  }
  receiverAcno:any;
  amountedTobeDeducted:any;
  result1:any;
  result2:any;

  transferMoney() {
    this.receiverAcno=this.formobj2.value.accountno;
    this.amountedTobeDeducted=this.formobj2.value.transferAmount;
    console.log(this.receiverAcno);
    console.log(this.amountedTobeDeducted);

    //checking for invalid receiver account number
    this.result1=this.CustomerList.filter((cus:any)=>{
      return cus.id===this.receiverAcno;
    })
    
    if(this.result1.length==0){
      alert("Can not find Receiver Account Number!");
      return;
    }

    //checking for insufficient amount
    this.result2=this.CustomerList.filter((cus:any)=>{
      return cus.id===this.senderAcno;
    });

    console.log(this.result2[0].amount);

    if(this.result2[0].amount<parseFloat(this.amountedTobeDeducted)){
      alert("Insufficient Amount!!!");
      return;
    }
    
    //updating sender and receiver account

    this.customerServiceObj.addMoney(this.receiverAcno,parseFloat(this.amountedTobeDeducted));
    this.customerServiceObj.withdrawMoney(this.senderAcno,parseFloat(this.amountedTobeDeducted))
    
    const newTransaction = {
      senderAcno: this.senderAcno,
      senderName: this.senderName,
      receiverAcno: this.receiverAcno,
      receiverName: this.CustomerList.filter((cus: any) => {
        return cus.id === this.receiverAcno;
      })[0].name,
      amount: this.amountedTobeDeducted,
      type: "debit",
      time: new Date().toLocaleString()
    };
    this.trasactionObj.addTransactions(newTransaction)
    this.receiverAcno = '';
    this.amountedTobeDeducted = '';
    this.isTransferMoney = false;
    this.formobj2.reset();
    // console.log(this.CustomerList);

  }

  closeAddMoney() {
    this.isAddMoney = false;
    this.amountTobeAdded = '';
    this.formobj1.reset();
    // console.log(this.formobj.valid);
    
  }
  closeTransferMoney() {
    this.isTransferMoney = false;
    this.amountedTobeDeducted = '';
    this.receiverAcno = '';
    this.formobj2.reset();
  }

  isChangePassword: boolean = false;
  handleClick3(id: string) {
    this.isChangePassword = true;
  }

  closeChangePassword() {
    this.isChangePassword = false;
  }

  changePassword() {

    if (this.formobj.value.previousPassword === this.specificCustomer.password) {
      this.CustomerList = this.CustomerList.map((cus: any) => {
        if (cus.id === this.specificCustomer.id)
          cus.password = this.formobj.value.currentPassword;
        return cus;
      });
      // this.specificCustomer.password = this.formobj.value.currentPassword;
      // console.log(this.CustomerList);
      // console.log(this.specificCustomer);
      alert("Password has been Changed Successfully");
      this.isChangePassword=false;
      this.formobj
    }
    else {
      alert("Incorrect Previous Password!")
    }
    // console.log(this.formobj.value);

  }
  formobj = new FormGroup({
    previousPassword: new FormControl('',[Validators.required]),
    currentPassword: new FormControl('',[Validators.required,VWITS_Validation.passwordValidation])
  });

  get f3(){
    return this.formobj.controls;
  }



}



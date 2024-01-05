import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../myservices/transactions.service';
import { LoginService } from '../myservices/login.service';
import { CustomersService } from '../myservices/customers.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private transactionObj:TransactionsService,private customerService:CustomersService,private loginObj:LoginService) 
  {

  }
  
  TransactionLists:any=[];
  specificCustomerAccno:string|undefined;
  specificTransactionLst:any;
  isSuccessfulLogin:boolean |undefined;
  userType:string | undefined;
  ngOnInit(): void {
     this.isSuccessfulLogin=this.loginObj.getISLoginSuccessful();
     this.userType=this.loginObj.getUserType();
     
      this.TransactionLists=this.transactionObj.getTransactionList();
      console.log(this.TransactionLists);
    
     if(this.userType==='customer'){
      this.specificCustomerAccno=this.customerService.getSpecificCustomer().id;
      this.specificTransactionLst=this.TransactionLists.filter((transaction:any)=>{
        if(transaction.type==='credit'){
          return transaction.senderAcno===this.specificCustomerAccno;
        }
        else{
          if(transaction.senderAcno===this.specificCustomerAccno){
            return true;
          }
          else if(transaction.receiverAcno===this.specificCustomerAccno){
            return true;
          }
          return false;
        }
        // else
        // return transaction.receiverAcno===this.specificCustomerAccno;
         
      });
      console.log("specific Acc no: "+this.specificCustomerAccno);

      console.log(this.specificTransactionLst);
     }  
  }

}

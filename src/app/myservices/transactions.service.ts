import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  transactionLists: any = [ //{
  //   senderAcno: "2334456",
  //   senderName: "Suvendu Hatua",
  //   amount: "1000",
  //   type: "credit",
  //   time: "12-12-2023 12:12 PM"
  // },
  // {
  //   senderAcno: "2334456",
  //   senderName: "Suvendu Hatua",
  //   receiverName:"Sonali Samanta",
  //   receiverAcno:"233776",
  //   amount: "1000",
  //   type: "debit",
  //   time: "12-12-2023 12:12 PM"
  // }
  ];
  constructor() { }

  addTransactions(transaction: any) {
    this.transactionLists.unshift(transaction);
    localStorage.setItem("transactions",JSON.stringify(this.transactionLists));
    

  }
  getTransactionList() {
    let transactions=localStorage.getItem("transactions");
    this.transactionLists= transactions?JSON.parse(transactions):[];
    console.log(this.transactionLists);
    return this.transactionLists;


  }
}

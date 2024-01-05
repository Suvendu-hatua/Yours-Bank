import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    CustomerComponent,
    TransactionsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

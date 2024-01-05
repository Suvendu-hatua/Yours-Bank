import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CustomerComponent } from './customer/customer.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"registration",component:RegistrationComponent},
  {path:"customer",component:CustomerComponent},
  {path:'transactions',component:TransactionsComponent},
  {
    path:'home',component:HomeComponent
  },

  {path:"",redirectTo:"home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

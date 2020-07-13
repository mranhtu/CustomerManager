import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {EditCustomerResolver} from './edit-customer/edit-customer.resolver';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: CreateCustomerComponent },
  { path: 'details/:id', component: EditCustomerComponent, resolve: {data : EditCustomerResolver} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

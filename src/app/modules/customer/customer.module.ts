import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer/customer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CustomerImgComponent } from './components/customer-img/customer-img.component';



@NgModule({
  declarations: [
    CustomerComponent,
    CustomerImgComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer/customer.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }

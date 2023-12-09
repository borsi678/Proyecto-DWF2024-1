import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvoiceModule { }

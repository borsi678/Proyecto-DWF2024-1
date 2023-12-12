import { Component } from '@angular/core';
import {Invoice} from "../../_models/Invoice";
import {InvoiceService} from "../../_services/invoice.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {Customer} from "../../../customer/_models/Customer";
import {Item} from "../../_models/Item";

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {

  invoice : Invoice = new Invoice();
  customer : Customer = new Customer();
  items : Item[] = [];

  constructor(private route : ActivatedRoute,
              private invoiceService : InvoiceService) {
  }
  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getInvoice(id);
      return;
    }
    this.alertError("Numero de factura invalido");
  }

  getInvoice(id : string){
    this.invoiceService.getInvoice(id).subscribe(
        res => {
          this.invoice = res
          this.customer =this.invoice.customer;
          this.items = this.invoice.items;
        },
        error => this.alertError(error.error.message)
    );
  }
  /* SweetAlert*/
  alertSuccess(message: string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      iconColor: '#4bbf73',
      toast: true,
      text: message,
      background: '#dbf2e3',
      color : '#1e4c2e',
      showConfirmButton: false,
      timer: 2000
    });
  }
  alertError(message : string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      iconColor: '#d9534f',
      toast: true,
      showConfirmButton: false,
      text: message,
      color: '#572120',
      background: '#f7dddc',
      timer: 2000
    });
  }
}

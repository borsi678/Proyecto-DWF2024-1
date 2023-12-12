import { Component } from '@angular/core';
import {DtoInvoiceList} from "../../_models/DtoInvoiceList";
import {InvoiceService} from "../../_services/invoice.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  private rfc: any | string = "";
  invoices : DtoInvoiceList[] = [];

  constructor(private invoiceService : InvoiceService,
              private router : Router,
              private route : ActivatedRoute) {}

  ngOnInit(){
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if(this.rfc){
      this.getInvoices();
      return;
    }
    this.alertError("RFC del cliente invalido");

  }
  getInvoices(){
    this.invoiceService.getInvoices(this.rfc).subscribe(
        res => this.invoices = res,
        error => this.alertError(error.error.message)
    );
  }

  showInvoice(id : number){
    this.router.navigate(['invoice/'+id]);
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
  alertError(message : string){
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

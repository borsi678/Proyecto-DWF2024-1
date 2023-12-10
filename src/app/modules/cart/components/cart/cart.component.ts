import { Component } from '@angular/core';
import {Cart} from "../../_models/Cart";
import { FormBuilder, Validators } from '@angular/forms';
import {CartService} from "../../_services/cart.service";
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../../invoice/_services/invoice.service";
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart : Cart [] = []
  rfc : any | string = "";
  pathImg : string = "../../../../../assets/imagenes/";

  constructor(private formBuilder : FormBuilder,
              private cartService : CartService,
              private invoiceService : InvoiceService,
              private route : ActivatedRoute,
              private router : Router) {}

  ngOnInit(){
    this.rfc=this.route.snapshot.paramMap.get('rfc');
    if (this.rfc){
      this.getCart();
      return;
    }
    this.alertError("RFC Invalido");
  }

  getCart(){
    this.cartService.getCart(this.rfc).subscribe(
      res => this.cart=res,
      error => this.alertError(error.error.message)
    );
  }

  removeFromCart(id : number){
    this.cartService.removeFromCart(id).subscribe(
      res => {
        this.alertSuccess("Se ha eliminado el producto.");
        this.getCart();
      }, error => this.alertError(error.error.message)
    );
  }

  clearCart(){
    this.cartService.deleteCart(this.rfc).subscribe(
      res => {
        this.alertSuccess("Se ha limpiado el carrito.");
        this.getCart();
      },
      error => this.alertError(error.error.message)
    );
  }

  showInvoice(){
    this.invoiceService.generateInvoice(this.rfc).subscribe(
      res => this.alertSuccess('Se ha realizado la compra'),
      error => this.alertError(error.error.message)
    );
    this.router.navigate(['invoice-customer/'+this.rfc]);
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

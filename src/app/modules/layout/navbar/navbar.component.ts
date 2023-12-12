import { Component } from '@angular/core';
import {CategoryService} from "../../category/_services/category.service";
import {Category} from "../../category/_models/category";
import Swal from "sweetalert2";
import {Cart} from "../../cart/_models/Cart";
import {CartService} from "../../cart/_services/cart.service";
import {InvoiceService} from "../../invoice/_services/invoice.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categoryList : Category[] = [];
  cart : Cart [] = []
  rfc : string = "SAAI920101A02";
  pathImg : string = "assets/imagenes/";

  constructor(private categoryService : CategoryService,
              private cartService : CartService,
              private invoiceService : InvoiceService,
              private route : ActivatedRoute,
              private router : Router) {}

  ngOnInit(){
    this.getActiveCategories();

    if (this.rfc){
      this.getCart();
      return;
    }
    this.alertError("RFC Invalido");
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe(
      res => this.categoryList = res,
      error => this.alertError(error.error.message)
    );
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
    setTimeout(() => {this.router.navigate(['invoice-customer/'+this.rfc]);},1000)

  }

  onClickGetCart(){

  }

  /*Sweetalert methods*/
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

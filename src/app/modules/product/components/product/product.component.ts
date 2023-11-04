import { Component } from '@angular/core';
import {Product} from "../../_models/product";
import { FormBuilder, Validators } from '@angular/forms';
import {ProductService} from "../../_services/product.service";
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  productUodated: boolean = false;
  submitted: boolean = false;

  form = this.formBuilder.group({

  });
  ngOnInit(){
    this.getProducts();
  }

  constructor(private productService : ProductService,
              private formBuilder : FormBuilder) {}

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  enableProduct(id : number){
    this.productService.activateProduct(id).subscribe(
      res => {
        this.alertSuccess("El producto ha sido activado.");
        this.getProducts();
      },
      error => {
        this.alertError(error.error.message);
      }
    )
  }

  disableProduct(id : number){
    this.productService.deleteProduct(id).subscribe(
      res => {
        this.alertSuccess("El producto ha sido desactivado.");
        this.getProducts();
      },
      error => {
        this.alertError(error.error.message);
      }
    )
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

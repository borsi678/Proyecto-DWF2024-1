import { Component } from '@angular/core';
import {Product} from "../../_models/product";
import { FormBuilder, Validators } from '@angular/forms';
import {ProductService} from "../../_services/product.service";
import Swal from 'sweetalert2';
import {Category} from "../../../category/_models/category";
import {CategoryService} from "../../_services/category.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  categories: Category[] = [];
  productUodated: boolean = false;
  submitted: boolean = false;

  form = this.formBuilder.group({
    category_id: [0, [Validators.required]],
    description: ["", [Validators.required]],
    gtin: ["", [Validators.required]],
    price: [0, [Validators.required]],
    product: ["", [Validators.required]],
    product_id: [0, []],
    status: [0, []],
    stock: [0, [Validators.required]]

  });
  ngOnInit(){
    this.getProducts();
  }

  constructor(private productService : ProductService,
              private categoryService : CategoryService,
              private formBuilder : FormBuilder,
              private router : Router) {}

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

  createProduct(){
    if (this.form.invalid) return;

    this.productService.createProduct(this.form.value).subscribe(
      res => {
        this.getProducts();
        $("#modalForm").modal("hide");
        this.alertSuccess("El producto ha sido agregado.");
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe(
      res =>{
        this.categories=res;
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  showProduct(gtin : string){
    this.router.navigate(['product/' + gtin]);
  }

  /*METHODS FORM*/

  showModalForm(){
    this.form.reset();
    this.productUodated = false;
    this.submitted=false;
    this.getActiveCategories();
    $("#modalForm").modal("show");
  }
  onSubmit(){
    this.submitted=true;
    this.createProduct();
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

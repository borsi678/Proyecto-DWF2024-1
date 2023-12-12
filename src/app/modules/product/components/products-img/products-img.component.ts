import { Component } from '@angular/core';
import {DtoProductCategoryList} from "../../_models/DtoProductCategoryList";
import {ProductService} from "../../_services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Category} from "../../../category/_models/category";
import {CategoryService} from "../../../category/_services/category.service";

@Component({
  selector: 'app-products-img',
  templateUrl: './products-img.component.html',
  styleUrls: ['./products-img.component.css']
})
export class ProductsImgComponent {
  productsList : DtoProductCategoryList[] = [];
  category : Category = new Category(0,"","",0);
  pathImg : string = "assets/imagenes/";
  constructor(private productService : ProductService,
              private categoryService : CategoryService,
              private route : ActivatedRoute,
              private router : Router) {}

  ngOnInit(){
    let category_id = this.route.snapshot.paramMap.get('id');
    this.getProducts(category_id!);
    this.getCategory(category_id!);
  }

  getProducts(category_id : string){
    this.productService.getProductsByCategory(category_id).subscribe(
      res => this.productsList = res,
      error => this.alertError(error.error.message)
    );
  }

  getCategory(category_id : string){
    this.categoryService.getCategory(category_id).subscribe(
      res => this.category = res,
      error => this.alertError(error.error.message)
    );
  }


  showProduct(gtin : string){
    this.router.navigate(['product/' + gtin]);
  }

  onImgError(event : any) {
    event.target.src = 'assets/default-imgs/product-img.png';
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

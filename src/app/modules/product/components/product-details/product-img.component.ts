import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Product} from "../../_models/product";
import { FormBuilder, Validators } from '@angular/forms';
import {ProductService} from "../../_services/product.service";
import Swal from 'sweetalert2';
import {Category} from "../../../category/_models/category";
import {CategoryService} from "../../_services/category.service";
import {ProductImagesService} from "../../_services/product-images.service";
import {ProductImg} from "../../_models/productImg";
import {Cart} from "../../../cart/_models/Cart";
import {CartService} from "../../../cart/_services/cart.service";
import {NgxPhotoEditorService} from "ngx-photo-editor";

declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-img.component.html',
  styleUrls: ['./product-img.component.css']
})
export class ProductImgComponent {

  product:  any | Product = new Product(0, "", "", 0, "", 0, 0, 0);
  gtin: any | string = "";
  productImgs : ProductImg[] = [];
  pathImg : string = "../../../../../assets/imagenes/";
  category : Category = new Category(0, "", "", 0);
  categories : Category[] = [];
  cart = new Cart();
  submitted : boolean = false;

  form = this.formBuilder.group({
    category_id: [0, []],
    description: ["", [Validators.required]],
    gtin: ["", [Validators.required]],
    price: [0, [Validators.required]],
    product: ["", [Validators.required]],
    product_id: [0, []],
    status: [0, []],
    stock: [0, [Validators.required]]

  });

  constructor(private productService : ProductService,
              private categoryService : CategoryService,
              private formBuilder : FormBuilder,
              private router : Router,
              private productImgService : ProductImagesService,
              private route : ActivatedRoute,
              private service : NgxPhotoEditorService,
              private cartService : CartService) {}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct(this.gtin);
      return;
    }
    this.alertError("GTIN del producto invalido");

  }

  initCart(){
    this.cart.gtin=this.gtin;
    this.cart.image=this.productImgs[0].image;
    this.cart.product=this.product;
    this.cart.quantity=1;
    this.cart.rfc="SAAI920101A02";
  }

  getProduct(gtin : string){
    this.productService.getProduct(gtin).subscribe(
      res => {
        this.product = res;
        this.getCategory(this.product.category_id);
        this.getProductImg();
      },
      error => {
        this.alertError(error.error.message)
      }
    )
  }


  getCategory(id : number) {
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res;
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  redirect(url: string[]){
    this.router.navigate(url);
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
    this.getProduct(gtin);
  }

  updateProduct(product : any){
    this.productService.updateProduct(product, product.product_id).subscribe(
      res =>{
        $("#modalForm").modal("hide");
        this.alertSuccess("EL producto ha sido actualizado");
        this.showProduct(product.gtin);
      },
      error => {
        this.alertError(error.error.message);
      }
    )
  }

  getProductImg(){
    this.productImgService.getProductImg(this.product.product_id).subscribe(
      res => {
        this.productImgs = res;
        console.log(res);
      },
      error =>{
        this.alertError(error.error.message);
      }
    );
  }


  updateProductImage(image : string){
    let productImage: ProductImg = new ProductImg();
    productImage.product_id = this.product.product_id;
    productImage.image = image;
    this.productImgService.updateProductImg(productImage).subscribe(
      res =>{
        this.alertSuccess("La imagen ha sido actualizada");
        this.getProductImg();
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  fileChangeHandler($event : any){
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.updateProductImage(data.base64!);
    });
  }

  deleteProductImg(product_image_id : number){
    this.productImgService.deleteProductImg(product_image_id).subscribe(
      res =>{
        this.alertSuccess("Se ha eliminado la imagen");
        this.getProductImg();
      }, error => this.alertError(error.error.message)
    );
  }

  addToCart(){
    this.initCart();
    this.cartService.addToCart(this.cart).subscribe(
      res => this.alertSuccess("Se ha agregado el producto al carrito"),
      error => this.alertError(error.error.message)
    );
  }


  /*Form methods*/

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.updateProduct(this.form.value);
  }

  showModalForm(){
    this.form.reset();
    this.submitted=false;
    this.getActiveCategories();

    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['product_id'].setValue(this.product.product_id);
    this.form.controls['status'].setValue(this.product.status);
    this.form.controls['stock'].setValue(this.product.stock);
    $("#modalForm").modal("show");
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

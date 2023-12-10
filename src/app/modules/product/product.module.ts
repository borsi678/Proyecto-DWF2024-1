import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductImgComponent } from './components/product-details/product-img.component';
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import { ProductsImgComponent } from './components/products-img/products-img.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductImgComponent,
    ProductsImgComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPhotoEditorModule
  ]
})
export class ProductModule { }

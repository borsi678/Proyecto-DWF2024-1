import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductImgComponent } from './components/product-img/product-img.component';
import {NgxPhotoEditorModule} from "ngx-photo-editor";

@NgModule({
  declarations: [
    ProductComponent,
    ProductImgComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProductComponent } from './components/product/product.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class ProductModule { }

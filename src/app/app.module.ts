import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CategoryModule } from "./modules/category/category.module";
import { CategoryComponent } from './modules/category/components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import {ProductModule} from "./modules/product/product.module";
import {CustomerModule} from "./modules/customer/customer.module";
import {RegionModule} from "./modules/region/region.module";
import {CartModule} from "./modules/cart/cart.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CategoryModule,
    HttpClientModule,
    CommonModule,
    ProductModule,
    CustomerModule,
    RegionModule,
    CartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

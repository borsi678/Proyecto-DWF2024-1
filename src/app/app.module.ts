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
import {InvoiceModule} from "./modules/invoice/invoice.module";
import {LayoutModule} from "./modules/layout/layout.module";
import {HomePageModule} from "./modules/home-page/home-page.module";
import {NgxDefaultImageModule} from "ngx-default-image";

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
    CartModule,
    InvoiceModule,
    LayoutModule,
    HomePageModule,
    NgxDefaultImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

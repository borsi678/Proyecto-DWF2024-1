import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent } from "./modules/category/components/category/category.component";
import {ProductComponent} from "./modules/product/components/product/product.component";
import {ProductImgComponent} from "./modules/product/components/product-details/product-img.component";
import {CustomerComponent} from "./modules/customer/components/customer/customer.component";
import {RegionComponent} from "./modules/region/components/region/region.component";
import {CustomerImgComponent} from "./modules/customer/components/customer-img/customer-img.component";
import {CartComponent} from "./modules/cart/components/cart/cart.component";
import {InvoiceComponent} from "./modules/invoice/components/invoice/invoice.component";
import {InvoiceDetailsComponent} from "./modules/invoice/components/invoice-details/invoice-details.component";
import {ProductsImgComponent} from "./modules/product/components/products-img/products-img.component";

const routes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent},
  { path: "", component: CategoryComponent },
  { path: "product/:gtin", component: ProductImgComponent},
  { path: "product/category/:id", component: ProductsImgComponent},
  { path: "customer", component: CustomerComponent},
  { path: "customer/:rfc", component: CustomerImgComponent},
  { path: "region", component: RegionComponent},
  { path: "cart/:rfc", component: CartComponent},
  { path: "invoice-customer/:rfc", component: InvoiceComponent},
  { path: "invoice/:id", component: InvoiceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

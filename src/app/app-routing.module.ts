import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent } from "./modules/category/components/category/category.component";
import {ProductComponent} from "./modules/product/components/product/product.component";
import {ProductImgComponent} from "./modules/product/components/product-img/product-img.component";
import {CustomerComponent} from "./modules/customer/components/customer/customer.component";
import {RegionComponent} from "./modules/region/components/region/region.component";
import {CustomerImgComponent} from "./modules/customer/components/customer-img/customer-img.component";

const routes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent},
  { path: "", component: CategoryComponent },
  { path: "product/:gtin", component: ProductImgComponent},
  { path: "customer", component: CustomerComponent},
  { path: "customer/:rfc", component: CustomerImgComponent},
  { path: "region", component: RegionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

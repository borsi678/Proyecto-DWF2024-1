import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent } from "./modules/product/components/category/category.component";
import {ProductComponent} from "./modules/product/components/product/product.component";

const routes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent},
  { path: "", component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

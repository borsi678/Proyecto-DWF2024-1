import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../_models/product";
import {DtoProductCategoryList} from "../_models/DtoProductCategoryList";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080";
  private route = "/product";

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.url + this.route );
  }

  createProduct(product : any){
    return this.http.post(this.url + this.route, product);
  }

  updateProductStock(gtin : string, stock : number){
    return this.http.put(this.url + this.route + '/' + gtin + '/stock/' + stock , null);
  }

  updateProduct(product : any, id :number){
    return this.http.put(this.url + this.route + '/' + id, product);
  }

  deleteProduct(id : number){
    return this.http.delete(this.url + this.route + '/' + id);
  }

  activateProduct(id : number){
    return this.http.put(this.url + this.route + '/' + id + '/activate', null);
  }

  getProduct(rfc : string){
    return this.http.get(this.url + this.route + '/' + rfc);
  }

  getActiveProduct(){
    return this.http.get(this.url + this.route + '/active');
  }

  getProductsByCategory(category_id : string){
    return this.http.get<DtoProductCategoryList[]>(this.url + this.route + '/category/' + category_id);
  }
}

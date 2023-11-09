import { Injectable } from '@angular/core';
import {ProductImg} from "../_models/productImg";
import { HttpClient } from '@angular/common/http';
import {Product} from "../_models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  private url = "http://localhost:8080";
  private route = "/product-image";

  constructor(private http: HttpClient) { }

  updateProductImg(productImg : ProductImg){
    return this.http.post(this.url + this.route, productImg);
  }

  getProductImg(id : number){
    return this.http.get<ProductImg[]>(this.url + this.route + '/' + id);
  }

  deleteProductImg(id : number){
    return this.http.delete(this.url + this.route + '/' + id);
  }
}

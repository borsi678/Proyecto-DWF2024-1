import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerImage} from "../_models/CustomerImage";
@Injectable({
  providedIn: 'root'
})
export class CustomerImageService {

  private url = "http://localhost:8080";
  private route = "/customer-image";
  constructor(private http : HttpClient) { }

  setCustomerImage(customerImage : any){
    return this.http.put(this.url + this.route, customerImage);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../_models/Customer";
import {DtoCustomerList} from "../_models/DtoCustomerList";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:8080";
  private route = "/customer";

  constructor(private http : HttpClient) { }

  getCustomers(){
    return this.http.get<DtoCustomerList[]>(this.url + this.route);
  }

  createCustomer(customer : any){
    return this.http.post(this.url + this.route, customer);
  }

  updateCustomer(id: number, customer : any){
    return this.http.put(this.url + this.route + '/' + id, customer);
  }

  deleteCustomer(id : number){
    return this.http.delete(this.url + this.route + '/' + id);
  }

  activateCustomer(id: number){
    return this.http.put(this.url + this.route + '/' + id + '/activate', null);
  }

  getCustomer(rfc : string){
    return this.http.get<Customer>(this.url + this.route + '/' + rfc);
  }
}

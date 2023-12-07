import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../_models/Invoice";
import {Item} from "../_models/Item";
import {DtoInvoiceList} from "../_models/DtoInvoiceList";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = "http://localhost:8080";
  private route = "/invoice";

  constructor(private http : HttpClient) { }

  getInvoice(id : number){
    return this.http.get<Invoice>(this.url + this.route + '/' + id + '/items');
  }

  getInvoices(rfc : string){
    return this.http.get<DtoInvoiceList[]>(this.url + this.route + '/' + rfc);
  }

  generateInvoice(rfc : string){
    return this.http.post(this.url + this.route + '/' + rfc,null);
  }
}

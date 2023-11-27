import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {resolve} from "@angular/compiler-cli";
import Swal from 'sweetalert2';
import {DtoCustomerList} from "../../_models/DtoCustomerList";
import {CustomerService} from "../../_services/customer.service";
import {Region} from "../../../region/_models/region";
import {RegionService} from "../../../region/_services/region.service";
import { Router } from '@angular/router';
import {error} from "@angular/compiler-cli/src/transformers/util";
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customers : DtoCustomerList[] = [];
  regions : Region[] = [];
  submitted : boolean = false;

  constructor(private customerService : CustomerService,
              private regionService : RegionService,
              private  formBuilder : FormBuilder,
              private router : Router) {}

  form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: ["", [Validators.required]],
    address: ["", [Validators.required]],
  });

  ngOnInit(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(
        res =>
          this.customers = res,
        error => this.alertError(error.error.message)
    )
  }

  disableCustomer(id: number){
    this.customerService.deleteCustomer(id).subscribe(
        res => {
          this.alertSuccess("El cliente ha sido desactivado");
          this.getCustomers();
        },
        err => this.alertError(err.error.message)
    );
  }

  enableCustomer(id: number) {
    this.customerService.activateCustomer(id).subscribe(
        res =>{
          this.alertSuccess('El cliente ha sido activado');
          this.getCustomers();
        }
        , error => this.alertError(error.error.message)
    );
  }

  createCustomer(customer : any){
    this.customerService.createCustomer(customer).subscribe(
        res => {
          this.alertSuccess("EL cliente se ha registrado");
          this.getCustomers();
          $("#modalForm").modal("hide");
        },
        error => this.alertError(error.error.message)
    );
  }

  showCustomer(rfc: string){
    this.router.navigate(['customer/' + rfc]);
  }

  getRegions() {
    this.regionService.getActiveRegions().subscribe(
        res => this.regions = res,
        error => this.alertError(error.error.message)
    );
  }

  /*** Forms ***/
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.createCustomer(this.form.value);
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    this.getRegions();
    $("#modalForm").modal("show");
  }


  /*** SweetAlert***/
  alertSuccess(message: string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      iconColor: '#4bbf73',
      toast: true,
      text: message,
      background: '#dbf2e3',
      color : '#1e4c2e',
      showConfirmButton: false,
      timer: 2000
    });
  }
  alertError(message : string){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      iconColor: '#d9534f',
      toast: true,
      showConfirmButton: false,
      text: message,
      color: '#572120',
      background: '#f7dddc',
      timer: 2000
    });
  }
}

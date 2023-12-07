import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../_models/Customer';
import { CustomerService } from '../../_services/customer.service';
import Swal from'sweetalert2'; // sweetalert
import { FormBuilder, Validators } from '@angular/forms';
import { Region } from '../../../region/_models/region';
import { RegionService } from '../../../region/_services/region.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { CustomerImageService } from '../../_services/customer-image.service';
import { CustomerImage } from '../../_models/CustomerImage';
import {error} from "@angular/compiler-cli/src/transformers/util";

declare var $: any; // jquery
@Component({
  selector: 'app-customer-img',
  templateUrl: './customer-img.component.html',
  styleUrls: ['./customer-img.component.css']
})
export class CustomerImgComponent {
  customer: any | Customer = new Customer(); // cliente consultado
  rfc: any | string = ""; // rfc del cliente consultado
  submitted : boolean = false;
  regions: Region[] = []; // lista de regiones
  region: any | Region = new Region(); // datos de la región del cliente
  constructor(    private customerService: CustomerService,
                  private customerImageService: CustomerImageService,
                  private formBuilder: FormBuilder,
                  private regionService: RegionService,
                  private route: ActivatedRoute,
                  private router: Router,
                  private service: NgxPhotoEditorService) {
  }

  form = this.formBuilder.group({
    customer_id: [0, []],
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: ["", [Validators.required]],
    address: ["", [Validators.required]],
    status: [0, []],
  });

  ngOnInit() {
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if (this.rfc) this.getCustomer();
    else this.alertError("RFC del cliente invalido");
  }

  getCustomer(){
    this.customerService.getCustomer(this.rfc).subscribe(
      res => {
        this.customer = res;
        this.getRegion(this.customer.region_id);
      }, error => this.alertError(error.error.message)
    );
  }
  updateCustomer(){

    this.customerService.updateCustomer(this.customer.customer_id, this.form.value).subscribe(
      res => {
        $("#modalForm").modal("hide");
        this.alertSuccess("EL cliente ha sido actualizado");
        this.showCustomer(this.form.value.rfc!);
      }, error => this.alertError(error.error.message)
    );
  }


  updateCustomerImg(image : string){
    let customerImage: CustomerImage = new CustomerImage();
    customerImage.customer_image_id = this.customer.image.customer_image_id;
    customerImage.image = image;

    this.customerImageService.setCustomerImage(customerImage).subscribe(
      res => {
        this.getCustomer();
        this.alertSuccess("La imagen ha sido actualizada");
        $("#modalForm").modal("hide");
      }, error =>this.alertError(error.error.message)
    );
  }

  fileChangeHandler($event : any){
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data =>
      this.updateCustomerImg(data.base64!));
  }

  getRegion(id : number){
    this.regionService.getRegion(id).subscribe(
      res => this.region = res,
      err => this.alertError(err.error.message)
    );
  }

  getRegions() {
    this.regionService.getActiveRegions().subscribe(
      res => this.regions = res,
        err => this.alertError(err.error.message)
    );
  }

  showCustomer(rfc : string){
    console.log(rfc);
    this.router.navigate(['customer/' + rfc]);
    this.rfc = rfc;
    this.getCustomer();
  }



  /*Form*/
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;
    this.updateCustomer();
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    this.getRegions();

    this.form.controls['name'].setValue(this.customer.name);
    this.form.controls['surname'].setValue(this.customer.surname);
    this.form.controls['rfc'].setValue(this.customer.rfc);
    this.form.controls['mail'].setValue(this.customer.mail);
    this.form.controls['region_id'].setValue(this.customer.region_id);
    this.form.controls['address'].setValue(this.customer.address);

    $("#modalForm").modal("show");
  }

  /*SweetALert*/
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

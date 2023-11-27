import { Component } from '@angular/core';
import {Region} from "../../_models/region";
import {RegionService} from "../../_services/region.service";
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {Category} from "../../../category/_models/category";
import {error} from "@angular/compiler-cli/src/transformers/util";
declare var $: any;

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent {
  regions : Region[] = [];
  regionUpdated: boolean = false;
  submitted : boolean = false;

  constructor(private regionService : RegionService,
              private formBuilder: FormBuilder) {
  }

  form = this.formBuilder.group({
    region_id: [0, []],
    region: ["", [Validators.required]],
    code: [0, [Validators.required]],
    status : [0, []]
  });

  ngOnInit(){
    this.getRegions();
  }

  getRegions(){
    this.regionService.getRegions().subscribe(
        res => this.regions = res,
        error => this.alertError(error.error.message)
    );
  }

  createRegion(){
    if(this.form.invalid) return;

    this.regionService.createRegion(this.form.value).subscribe(
        res =>{
          this.getRegions();
          $("#modalForm").modal("hide");
          this.alertSuccess("La region ha sido agregada");
        },
        error => this.alertError(error.error.message)
    );
  }

  updateRegion(){
    if(this.form.invalid) return;
    let region= <Region>this.form.value;
    this.regionService.updateRegion(region.region_id, region).subscribe(
      res =>{
        this.getRegions();
        this.alertSuccess("La region ha sido actualizada");
        $("#modalForm").modal("hide");
      }, error => this.alertError(error.error.message)
    );
  }

  disableRegion(id : number){
    this.regionService.deleteRegion(id).subscribe(
        res =>{
          this.getRegions();
          this.alertSuccess("La region ha sido desactivada");
        }, error => this.alertError(error.error.message)
    );
  }

  enableRegion(id : number){
    this.regionService.activateRegion(id).subscribe(
        res =>{
          this.getRegions();
          this.alertSuccess("La region ha sido activada");
        }, error => this.alertError(error.error.message)
    );
  }
  /* Forms*/
  onSubmit(){
    this.submitted=true;
    if(!this.regionUpdated){
      this.createRegion();
      return;
    }
    this.updateRegion();
  }
  showModalForm(){
    this.form.reset();
    this.regionUpdated=false;
    this.submitted=false;
    $("#modalForm").modal("show");
  }

  showModalFormUpdated (region : Region){
    this.regionUpdated=true;
    this.submitted=false;
    this.form.reset();
    this.form.controls['region_id'].setValue(region.region_id);
    this.form.controls['region'].setValue(region.region);
    this.form.controls['code'].setValue(region.code);
    this.form.controls['status'].setValue(region.status);
    $("#modalForm").modal("show");

  }

  /*SweetALert */
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

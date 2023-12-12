import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import {CategoryService} from '../../_services/category.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Category[] = [];
  categoryUpdated: boolean = false; // true si la categoria se actualiza, false si se es nueva
  submitted : boolean= false;

  ngOnInit(){
    this.getCategories();
  }

  form = this.formBuilder.group({
    id: [0, []],
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });


  constructor( private categoryService: CategoryService,
               private formBuilder: FormBuilder) {}
  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories=res;
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  showModalForm(){
    this.form.reset();
    this.categoryUpdated=false;
    this.submitted=false;
    $("#modalForm").modal("show");
  }
  showModalFormUpdated (category : Category){
    this.categoryUpdated=true;
    this.submitted=false;
    this.form.reset();
    this.form.controls['id'].setValue(category.category_id);
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    $("#modalForm").modal("show");

  }
  onSubmit(){
    this.submitted=true;
    if(!this.categoryUpdated){
      this.createCategory();
      return;
    }
    this.updateCategory(this.form.value);
  }

  createCategory(){
    if(this.form.invalid) return;

    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        this.getCategories(); //consulta las categorias actualizadas
        $("#modalForm").modal("hide"); //oculta el modal
        this.alertSuccess("La categoria ha sido agregada");
      },
      error => this.alertError(error.error.message)
    );
  }


  updateCategory(category : any){
    if(this.form.invalid) return;
    this.categoryService.updateCategory(category,category.id).subscribe(
      res => {
        this.getCategories();
        $("#modalForm").modal("hide");
        this.alertSuccess("La categoria ha sido actualizada");
        },
      error => this.alertError(error.error.message)
      );

  }


  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        this.alertSuccess("La categoria ha sido desactivada");

        this.getCategories();
      },
      error => {
        this.alertError(error.error.message);
      }
    );
  }

  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        this.alertSuccess("La categoria ha sido activada");

        this.getCategories();
      }, error => this.alertError(error.error.message)
    );
  }

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


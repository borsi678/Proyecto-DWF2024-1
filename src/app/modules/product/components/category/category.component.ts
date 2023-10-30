import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import {CategoryService} from '../../_services/category.service';
import {resolve} from "@angular/compiler-cli";
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
        console.log("categorias cargadas")
      },
      err => {
        console.log("error al cargar categorias")
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
        console.log("creado categoria")
        this.getCategories(); //consulta las categorias actualizadas
        $("#modalForm").modal("hide"); //oculta el modal
      },
      error => {
        console.log("fallo agregar categoria")
      }
    )
  }


  updateCategory(category : any){
    if(this.form.invalid) return;
    console.log(category);
    this.categoryService.updateCategory(category,category.id).subscribe(
      res => {

        this.getCategories();
        console.log("categoria actualizada");
        $("#modalForm").modal("hide");
      },
      error => {
        console.log("error al actualziar categoria");
      }
    )

  }


  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        console.log("categoria deshabilitada");

        this.getCategories();
      },
      error => {
        console.log("error al deshabilitar categorias");
      }
    );
  }

  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        console.log("categoria habilitada");

        this.getCategories();
      },
      error => {
        console.log("error al habilitar categorias");
      }
    );
  }

}


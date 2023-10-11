import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Category[] = [];

  ngOnInit(){
    this.getCategories();
  }

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;

  constructor(private formBuilder: FormBuilder) {

  }
  getCategories(){
    let category1 = new Category(1, "ABCDE", "Uno", 1);
    let category2 = new Category(2, "ABCDF", "Dos", 1);
    let category3 = new Category(3, "ABCDG", "Tres", 0);

    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0, this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    this.categories.push(category);

    $("#modalForm").modal("hide");

    alert("Categoria guardada exitosamente!");

  }

}


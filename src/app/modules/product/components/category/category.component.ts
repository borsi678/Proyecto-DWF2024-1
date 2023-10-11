import { Component } from '@angular/core';
import { Category } from '../../_models/category';
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

  getCategories(){
    let category1 = new Category(1, "ABCDE", "Uno", 1);
    let category2 = new Category(2, "ABCDF", "Dos", 1);
    let category3 = new Category(3, "ABCDG", "Tres", 0);

    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
  }


}


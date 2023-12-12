import { Component } from '@angular/core';
import {CategoryService} from "../../category/_services/category.service";
import {Category} from "../../category/_models/category";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categoryList : Category[] = [];

  constructor(private categoryService : CategoryService,
              private router : Router) {}

  ngOnInit() {
    this.getActiveCategories();
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe(
      res => this.categoryList = res,
      error => this.alertError(error.error.message)
    );
  }

  showProductCategory(id : any){
    this.router.navigate(['product/category/'+id]);
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

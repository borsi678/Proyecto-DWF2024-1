import { Component } from '@angular/core';
import {CategoryService} from "../../category/_services/category.service";
import {Category} from "../../category/_models/category";
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categoryList : Category[] = [];

  constructor(private categoryService : CategoryService) {}

  ngOnInit(){
    this.getActiveCategories();
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe(
      res => this.categoryList = res,
      error => this.alertError(error.error.message)
    );
  }

  /*Sweetalert methods*/
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

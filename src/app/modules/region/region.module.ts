import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './components/region/region.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RegionComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class RegionModule { }

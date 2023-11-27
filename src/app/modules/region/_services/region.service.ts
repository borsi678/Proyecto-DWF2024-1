import { Injectable } from '@angular/core';
import {Region} from "../_models/region";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private url = "http://localhost:8080";
  private route = "/region";

  constructor(private http : HttpClient) { }

  getRegions(){
    return this.http.get<Region[]>(this.url + this.route);
  }

  createRegion(region : any){
    return this.http.post(this.url + this.route, region);
  }

  getRegion(id : number){
    return this.http.get<Region>(this.url + this.route + "/" + id );
  }

  updateRegion(id : number, region : any){
    return this.http.put(this.url + this.route + "/" + id, region);
  }

  deleteRegion(id : number){
    return this.http.delete(this.url + this.route + "/" + id);
  }

  gitactivateRegion(id : number){
    return this.http.put(this.url + this.route + "/" + id + "/activate", null);
  }

  getActiveRegions(){
    return this.http.get<Region[]>(this.url + this.route + "/active");
  }

}

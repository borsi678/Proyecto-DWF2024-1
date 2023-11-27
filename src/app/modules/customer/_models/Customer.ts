import {CustomerImage} from "./CustomerImage";

export class Customer{
  address:	string;
  customer_id:	number;
  image:	CustomerImage;
  mail:	string;
  name:	string;
  region_id: number;
  rfc:	string;
  status: number;
  surname:	string;

  constructor() {
    this.address="";
    this.customer_id= 0;
    this.image = new CustomerImage;
    this.mail = "";
    this.name = "";
    this.region_id = 0;
    this.rfc = "";
    this.status = 0;
    this.surname = "";
  }

}

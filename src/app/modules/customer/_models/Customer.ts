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

  constructor(address: string, customer_id: number,
              mail: string, name: string, surname: string,
              rfc: string, status: number) {
    this.address=address;
    this.customer_id= customer_id;
    this.image = new CustomerImage;
    this.mail = mail;
    this.name = name;
    this.region_id = 0;
    this.rfc = rfc;
    this.status = status;
    this.surname = surname;
  }

}

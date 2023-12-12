import {Product} from "../../product/_models/product";

export class Cart{
  cart_id : number = 0;
  gtin	: string = "";
  image	: string = "";
  product:	Product = new Product(0, "", "",
    0, "", 0, 0, 0);
  quantity :	number = 0;
  rfc	: string = "";
}

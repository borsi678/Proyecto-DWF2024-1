
export class Product {
  category_id: number;
  description : string;
  gtin : string;
  price : number;
  product : string;
  product_id : number;
  status : number;
  stock : number;

  constructor(  category_id: number, description : string, gtin : string,  price : number,
  product : string, product_id : number, status : number, stock : number) {
    this.category_id = category_id;
    this.description = description ;
    this.gtin = gtin;
    this.price = price;
    this.product = product;
    this.product_id = product_id;
    this.status = status;
    this.stock = stock;
  }
}

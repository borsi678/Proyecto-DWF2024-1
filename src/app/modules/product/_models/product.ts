
export class Product {
  category_id: number = 0;
  description : string = "";
  gtin : string = "";
  price : number = 0;
  product : string = "";
  product_id : number = 0;
  status : number = 0;
  stock : number = 0;

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

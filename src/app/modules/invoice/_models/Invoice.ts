import {Customer} from "../../customer/_models/Customer";
import {Item} from "./Item";

export class Invoice{
  created_at	: string = "";
  customer : Customer = new Customer();
  invoice_id	: number = 0;
  items	: Item[] = [];
  rfc	: string = "";
  subtotal :	number = 0;
  taxes:	number = 0;
  total	:	number = 0;
}

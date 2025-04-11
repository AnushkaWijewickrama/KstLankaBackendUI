import { Productdetails } from "./productdetails";

export interface Model {
  _id: string;
  title: string;
  description: string;
  imagePath: string,
  brand: string,
  sortval: string,
  productdetails: Productdetails[]
}

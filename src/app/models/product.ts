import { subCategoty } from "./subCategoty";

export interface Product {
  _id: string;
  title: string;
  description: string;
  imagePath: string,
  brand: any
  model: any,
  subcategories: subCategoty[]
}

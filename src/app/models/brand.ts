import { Model } from "./model";

export interface Brand {
  _id: string;
  title: string;
  description: string;
  imagePath: string,
  brand: string,
  code: string,
  model: Model[]
}

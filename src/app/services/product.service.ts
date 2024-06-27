import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Product } from "../models/product";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: any = [];
  private product$ = new Subject<Product[]>();
  readonly url = SERVER_API_URL + "/api/products";
  readonly bannerUrl = SERVER_API_URL + "/api/banner";

  constructor(private http: HttpClient, private route: Router) { }

  getProduct() {
    this.http
      .get<Product>(this.url)
      .pipe(
        map((productData) => {
          return productData;
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.product$.next(this.products);
      });
  }

  getProductStream() {
    return this.product$.asObservable();
  }

  addProduct(title: string, image: File, description: string, subcategories: any): void {
    const productData = new FormData();
    productData.append("title", title);
    productData.append("image", image);
    productData.append("description", description);
    productData.append("subcategories", JSON.stringify(subcategories));
    this.http
      .post<Product>(this.url, productData)
      .subscribe((productData: any) => {
        const product: Product = {
          _id: productData?._id,
          title: productData?.title,
          description: productData?.description,
          imagePath: productData?.imagePath,
          brand: productData?.brand,
          model: productData?.model,
        };
        this.route.navigate(['/product'])
        this.products.push(product);

        this.product$.next(this.products);

      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }


  getSingleData(id: string): Observable<HttpResponse<{}>> {
    return this.http.get(`${this.url}/singledata/${id}`, { observe: 'response' });
  }
  updateSingleData(title: string, image: File, description: string, id: string, subcategories: any): void {
    const productData = new FormData();
    productData.append("title", title);
    if (image) {
      productData.append("image", image);

    }
    productData.append("description", description);
    productData.append("subcategories", JSON.stringify(subcategories));

    this.http
      .put<{ product: Product }>(`${this.url}/update/${id}`, productData)
      .subscribe((product: any) => {
        const model: Product = {
          _id: product?._id,
          title: product?.title,
          description: product?.description,
          imagePath: product?.imagePath,
          brand: product?.brand,
          model: product?.model
        };
        this.products.push(model);

        this.product$.next(this.products);
        this.route.navigate(['/product'])

      });
  }


}


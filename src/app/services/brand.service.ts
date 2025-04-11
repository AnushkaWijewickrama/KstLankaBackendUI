import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Brand } from "../models/brand";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class BrandService {
  private brand: any = [];
  private brand$ = new Subject<Brand[]>();
  readonly url = SERVER_API_URL + "/api/brand";
  readonly bannerUrl = SERVER_API_URL + "/api/brand";

  constructor(private http: HttpClient, private router: Router) { }

  getBrands() {
    this.http
      .get<{ profiles: any }>(this.url)
      .pipe(
        map((brandData) => {
          console.log(brandData)
          return brandData;
        })
      )
      .subscribe((banners) => {
        this.brand = banners;
        this.brand$.next(this.brand);
      });
  }

  getBrandStream() {
    return this.brand$.asObservable();
  }

  addBrand(title: string, image: File, description: string, model: any, code: string): void {
    const bannerData = new FormData();
    bannerData.append("title", title);
    bannerData.append("image", image);
    bannerData.append("description", description);
    bannerData.append("code", code);
    bannerData.append("model", JSON.stringify(model));
    this.http
      .post<{ profile: Brand }>(this.bannerUrl, bannerData)
      .subscribe((brandData: any) => {
        const brand: Brand = {
          _id: brandData?._id,
          title: brandData?.title,
          description: brandData?.description,
          imagePath: brandData?.imagePath,
          brand: brandData?.brand,
          code: brandData?.code,
          model: brandData.model
        };
        this.brand.push(brand);

        this.brand$.next(this.brand);
        this.router.navigate(['/brand'])

      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }
  getSingleData(id: string): Observable<HttpResponse<{}>> {
    return this.http.get(`${this.url}/singledata/${id}`, { observe: 'response' });
  }
  updateSingleData(title: string, image: File, description: string, model: any, id: string, code: string): void {
    const bannerData = new FormData();
    bannerData.append("title", title);
    bannerData.append("code", code);
    if (image) {
      bannerData.append("image", image);

    }
    bannerData.append("description", description);
    bannerData.append("model", JSON.stringify(model));
    this.http
      .put<{ brand: Brand }>(`${this.url}/update/${id}`, bannerData)
      .subscribe((brandData: any) => {
        const brand: Brand = {
          _id: brandData?._id,
          title: brandData?.title,
          description: brandData?.description,
          imagePath: brandData?.imagePath,
          code: brandData?.code,
          brand: brandData?.brand,
          model: brandData.model
        };
        this.brand.push(brand);

        this.brand$.next(this.brand);
        this.router.navigate(['/brand'])

      });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }

}

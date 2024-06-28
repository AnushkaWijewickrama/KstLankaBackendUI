import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Model } from "../models/model";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class ModelService {
  private model: any = [];
  private model$ = new Subject<Model[]>();
  readonly url = SERVER_API_URL + "/api/model";
  readonly modelUrl = SERVER_API_URL + "/api/model";

  constructor(private http: HttpClient, private router: Router) { }

  getModel() {
    this.http
      .get<{ profiles: any }>(this.url)
      .pipe(
        map((brandData) => {
          console.log(brandData)
          return brandData;
        })
      )
      .subscribe((model) => {
        this.model = model;
        this.model$.next(this.model);
      });
  }

  getModelStream() {
    return this.model$.asObservable();
  }

  addModel(title: string, image: File, description: string, productdetails: any, sortval: any): void {
    const modelData = new FormData();
    modelData.append("title", title);
    modelData.append("image", image);
    modelData.append("description", description);
    modelData.append("sortval", sortval);
    modelData.append("productdetails", JSON.stringify(productdetails));
    this.http
      .post<{ profile: Model }>(this.modelUrl, modelData)
      .subscribe((modelData: any) => {
        const brand: Model = {
          _id: modelData?._id,
          title: modelData?.title,
          description: modelData?.description,
          imagePath: modelData?.imagePath,
          brand: modelData?.brand,
          sortval: modelData?.sortval
        };
        this.model.push(brand);

        this.model$.next(this.model);
        this.router.navigate(['/model'])
      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }
  getBrandIdBymodel(id?: any): Observable<any> {
    return this.http.get<any[]>(this.url + '/' + id, { observe: 'response' });
  }
  getSingleData(id: string): Observable<HttpResponse<{}>> {
    return this.http.get(`${this.url}/singledata/${id}`, { observe: 'response' });
  }
  updateSingleData(title: string, image: File, description: string, productdetails: any, id: string, sortval: any): void {
    const modelData = new FormData();
    modelData.append("title", title);
    if (image) {
      modelData.append("image", image);

    }
    modelData.append("sortval", sortval);
    modelData.append("description", description);
    modelData.append("productdetails", JSON.stringify(productdetails));
    this.http
      .put<{ model: Model }>(`${this.url}/update/${id}`, modelData)
      .subscribe((modelData: any) => {
        const model: Model = {
          _id: modelData?._id,
          title: modelData?.title,
          description: modelData?.description,
          imagePath: modelData?.imagePath,
          brand: modelData?.brand,
          sortval: modelData?.brand
        };
        this.model.push(model);

        this.model$.next(this.model);
        this.router.navigate(['/model'])

      });
  }

}

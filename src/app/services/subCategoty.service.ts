import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Router } from "@angular/router";
import { subCategoty } from "../models/subCategoty";
import { FormGroup } from "@angular/forms";


@Injectable({
  providedIn: "root",
})
export class SubCategotyService {
  private subCategoty: any = [];
  private subCategoty$ = new Subject<subCategoty[]>();
  readonly url = SERVER_API_URL + "/api/subCategory";
  readonly subCategotyUrl = SERVER_API_URL + "/api/subCategory";

  constructor(private http: HttpClient, private router: Router) { }

  getsubCategoty() {
    this.http
      .get<{ subCategoty: any }>(this.url)
      .pipe(
        map((subCategotyData) => {
          return subCategotyData;
        })
      )
      .subscribe((subCategoty) => {
        this.subCategoty = subCategoty;
        this.subCategoty$.next(this.subCategoty);
      });
  }

  getsubCategotyStream() {
    return this.subCategoty$.asObservable();
  }
  // this.form.value.brand, this.form.value.id, this.form.value.title
  addsubCategoty(brand: string, title: string, form: FormGroup): void {
    const subCategotyData: any = {};
    subCategotyData['brand'] = JSON.stringify(brand);
    subCategotyData['title'] = title;
    console.log(subCategotyData)
    this.http
      .post<{ subCategoty: subCategoty }>(`${this.url}`, subCategotyData)
      .subscribe((brandData: any) => {
        const subCategoty: subCategoty = {
          brand: brandData?.brand,
          title: brandData?.title,
          _id: brandData._id,
          code: brandData.code
        };
        this.subCategoty.push(subCategoty);

        this.subCategoty$.next(this.subCategoty);
        form.reset()
        this.router.navigate(['/subCategoty'])

      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }
  getFindByIdsubCategoty(id?: any): Observable<any> {
    return this.http.get<any[]>(this.url + '/' + id, { observe: 'response' });
  }
  getSingleData(id: string): Observable<HttpResponse<{}>> {
    return this.http.get(`${this.url}/singledata/${id}`, { observe: 'response' });
  }
  updateSingleData(brand: any, id: string, title: string, form: FormGroup): void {
    const subCategotyData: any = {};
    subCategotyData['brand'] = JSON.stringify(brand);
    subCategotyData['title'] = title;
    console.log(subCategotyData)
    this.http
      .put<{ subCategoty: subCategoty }>(`${this.url}/update/${id}`, subCategotyData)
      .subscribe((brandData: any) => {
        const subCategoty: subCategoty = {
          brand: brandData?.brand,
          title: brandData?.title,
          _id: brandData._id,
          code: brandData.code


        };
        this.subCategoty.push(subCategoty);

        this.subCategoty$.next(this.subCategoty);
        form.reset()
        this.router.navigate(['/subCategoty'])

      });
  }

}

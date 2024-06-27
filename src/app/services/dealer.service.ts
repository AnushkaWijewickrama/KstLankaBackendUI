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
export class DealerService {
  readonly url = SERVER_API_URL + "/api/registerDealer";

  constructor(private http: HttpClient, private router: Router) { }


  addDealer(title: string, pdf: any, longDescription: any): Observable<any> {

    console.log(pdf)
    const productData = new FormData();
    productData.append("title", title);
    productData.append("pdf", pdf);
    productData.append("longDescription", longDescription);
    return this.http.post<any>(this.url, productData, { observe: 'response' });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }

}

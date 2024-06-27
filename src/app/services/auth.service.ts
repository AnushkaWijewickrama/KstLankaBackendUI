import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Brand } from "../models/brand";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly resourceUrl = SERVER_API_URL + "/api/user/login";

  constructor(private http: HttpClient) { }

  create(login: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl, login, { observe: 'response' });
  }

}

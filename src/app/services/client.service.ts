import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Client } from "../models/client";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private clients: any = [];
  private clients$ = new Subject<Client[]>();
  readonly url = SERVER_API_URL + "/api/client";
  readonly clientUrl = SERVER_API_URL + "/api/client";

  constructor(private http: HttpClient, private route: Router) { }

  getBannner() {
    this.http
      .get<{ profiles: any }>(this.url)
      .pipe(
        map((clientData) => {
          console.log(clientData)
          return clientData;
        })
      )
      .subscribe((clients) => {
        this.clients = clients;
        this.clients$.next(this.clients);
      });
  }

  getBannerStream() {
    return this.clients$.asObservable();
  }

  addBanner(title: string, image: File, description: string, brand: string): void {
    const clientData = new FormData();
    clientData.append("title", title);
    clientData.append("image", image);
    clientData.append("description", description);
    // profileData.append("brand",JSON.stringify(brand));
    this.http
      .post<{ client: Client }>(this.clientUrl, clientData)
      .subscribe((clientData: any) => {
        const client: Client = {
          _id: clientData?._id,
          title: clientData?.title,
          description: clientData?.description,
          imagePath: clientData?.imagePath,
          brand: clientData?.brand,
        };
        this.clients.push(client);

        this.clients$.next(this.clients);
        this.route.navigate(['/client'])
      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }

}

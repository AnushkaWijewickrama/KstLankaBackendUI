import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Router } from "@angular/router";
import { Brand } from "../models/brand";
import { Events } from "../models/event";

@Injectable({
  providedIn: "root",
})
export class EventSingleService {
  private events: any = [];
  private event$ = new Subject<Events[]>();
  readonly url = SERVER_API_URL + "/api/event";

  constructor(private http: HttpClient, private router: Router) { }

  getevent() {
    this.http
      .get<Events>(this.url)
      .pipe(
        map((eventData) => {
          console.log(eventData)
          return eventData;
        })
      )
      .subscribe((events) => {
        this.events = events;
        this.event$.next(this.events);
      });
  }

  geteventStream() {
    return this.event$.asObservable();
  }

  addevent(title: string, image: any, description: string, longDescription: any): void {
    const eventData = new FormData();
    eventData.append("title", title);
    eventData.append("longDescription", longDescription);
    Object.keys(image).forEach(element => {
      eventData.append("image", image[element].image);
    });
    eventData.append("description", description);
    this.http
      .post<Events>(this.url, eventData)
      .subscribe((eventData: any) => {
        const event: any = {
          _id: eventData?._id,
          title: eventData?.title,
          description: eventData?.description,
          imagePath: eventData?.imagePath,
        };
        this.events.push(event);

        this.event$.next(this.events);
        this.router.navigate(['/events'])
      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }
  // this.form.value.title, this.image.value, this.form.value.description, this.form.value.longDescription, this.form.value.pdf, this.form.value.id
  updateSingleData(title: string, image: any, description: string, longDescription: any, id: string): void {
    console.log(id)
    const eventData = new FormData();
    eventData.append("title", title);
    eventData.append("longDescription", longDescription);
    if (image) {
      Object.keys(image).forEach(element => {
        eventData.append("image", image[element].image);
      });
    }

    eventData.append("description", description);
    this.http
      .put<{ brand: Brand }>(`${this.url}/update/${id}`, eventData)
      .subscribe((eventData: any) => {
        const event: any = {
          _id: eventData?._id,
          title: eventData?.title,
          description: eventData?.description,
          imagePath: eventData?.imagePath,
          brand: eventData?.brand,
        };
        this.events.push(event);

        this.event$.next(this.events);
        this.router.navigate(['/events'])
      });
  }
  getSingleData(id: string): Observable<HttpResponse<{}>> {
    return this.http.get(`${this.url}/singledata/${id}`, { observe: 'response' });
  }

}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { EventSingleService } from "../../../services/event.service";
import { Events } from "../../../models/event";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-create-event",
  templateUrl: "./all-event-single.component.html",
  styleUrls: ["./all-event-single.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink]
})
export class AlleventSingleComponent implements OnInit, OnDestroy {
  eventList: Events[] = [];
  private eventSubscription!: Subscription;
  page: number = 1;

  constructor(private eventService: EventSingleService) { }

  ngOnInit(): void {
    this.eventService.getevent();
    this.eventSubscription = this.eventService
      .geteventStream()
      .subscribe((event: any[]) => {
        this.eventList = event;
      });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.eventService.delete(id).subscribe(res => {
        this.eventService.getevent();
      })
    }
  }

}

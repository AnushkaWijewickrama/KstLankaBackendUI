import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { ClientService } from "../../../services/client.service";
import { Client } from "../../../models/client";
@Component({
  selector: "app-create-client",
  templateUrl: "./all-client.component.html",
  styleUrls: ["./all-client.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink]
})
export class AllClientComponent implements OnInit, OnDestroy {
  client: Client[] = [];
  private clientSubscription!: Subscription;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getBannner();
    this.clientSubscription = this.clientService
      .getBannerStream()
      .subscribe((client) => {
        this.client = client;
        console.log(client)
      });
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.clientService.delete(id).subscribe(res => {
        this.clientService.getBannner();
      })
    }
  }

}

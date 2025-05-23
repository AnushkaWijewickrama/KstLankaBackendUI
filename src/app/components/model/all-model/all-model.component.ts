import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product.service";
import { ModelService } from "../../../services/model.service";
import { Model } from "../../../models/model";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-create-model",
  templateUrl: "./all-model.component.html",
  styleUrls: ["./all-model.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink, NgxPaginationModule]
})
export class AllModelComponent implements OnInit, OnDestroy {
  modelList: Model[] = [];
  private modelSubscription!: Subscription;
  page: number = 1;

  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
    this.modelService.getModel();
    this.modelSubscription = this.modelService
      .getModelStream()
      .subscribe((product: Model[]) => {
        this.modelList = product;
      });
  }

  ngOnDestroy() {
    this.modelSubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.modelService.delete(id).subscribe(res => {
        this.modelService.getModel();
      })
    }
  }

}

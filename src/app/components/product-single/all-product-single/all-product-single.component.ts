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
import { ProductSingleService } from "../../../services/productsingle.service";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-create-product",
  templateUrl: "./all-product-single.component.html",
  styleUrls: ["./all-product-single.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink]
})
export class AllProductSingleComponent implements OnInit, OnDestroy {
  productDetailsList: Product[] = [];
  private productSubscription!: Subscription;
  page: number = 1;

  constructor(private productService: ProductSingleService) { }

  ngOnInit(): void {
    this.productService.getProduct();
    this.productSubscription = this.productService
      .getProductStream()
      .subscribe((product: Product[]) => {
        this.productDetailsList = product;
      });
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.productService.delete(id).subscribe(res => {
        this.productService.getProduct();
      })
    }
  }

}

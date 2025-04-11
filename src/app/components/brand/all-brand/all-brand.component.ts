import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { Brand } from "../../../models/brand";
import { BrandService } from "../../../services/brand.service";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-create-brand",
  templateUrl: "./all-brand.component.html",
  styleUrls: ["./all-brand.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink, NgxPaginationModule]
})
export class AllBrandComponent implements OnInit, OnDestroy {
  brandList: Brand[] = [];
  private bannerSubscription!: Subscription;
  page: number = 1;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService.getBrands();
    this.bannerSubscription = this.brandService
      .getBrandStream()
      .subscribe((brand: Brand[]) => {
        this.brandList = brand;
      });
  }

  ngOnDestroy() {
    this.bannerSubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.brandService.delete(id).subscribe(res => {
        this.brandService.getBrands();
      })
    }
  }
}

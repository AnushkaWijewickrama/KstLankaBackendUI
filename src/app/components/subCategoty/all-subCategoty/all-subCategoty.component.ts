import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { subCategoty } from "../../../models/subCategoty";
import { SubCategotyService } from "../../../services/subCategoty.service";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-create-model",
  templateUrl: "./all-subCategoty.component.html",
  styleUrls: ["./all-subCategoty.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink, NgxPaginationModule]
})
export class AllsubCategotyComponent implements OnInit, OnDestroy {
  subCategotyList: subCategoty[] = [];
  private subCategotySubscription!: Subscription;
  page: number = 1;

  constructor(private subCategotyService: SubCategotyService) { }

  ngOnInit(): void {
    this.subCategotyService.getsubCategoty();
    this.subCategotySubscription = this.subCategotyService
      .getsubCategotyStream()
      .subscribe((subCategoty: subCategoty[]) => {
        this.subCategotyList = subCategoty;
      });
  }

  ngOnDestroy() {
    this.subCategotySubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.subCategotyService.delete(id).subscribe(res => {
        this.subCategotyService.getsubCategoty();
      })
    }
  }

}

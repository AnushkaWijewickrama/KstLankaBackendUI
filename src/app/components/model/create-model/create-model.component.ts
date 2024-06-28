import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product.service";
import { BannerService } from "../../../services/banner.service";
import { BrandService } from "../../../services/brand.service";
import { ModelService } from "../../../services/model.service";
import { ProductSingleService } from "../../../services/productsingle.service";


@Component({
  selector: "app-create-model",
  templateUrl: "./create-model.component.html",
  styleUrls: ["./create-model.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule]
})
export class CreateModelComponent implements OnInit {
  form!: FormGroup;
  product!: Product;
  imageData!: any;
  productDetailsList: any = [];
  bannerSubscription: any;
  isedit: boolean = false;

  constructor(private modelService: ModelService, private router: Router, private productSingleService: ProductSingleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      productdetails: new FormControl(null),
      id: new FormControl(null),
      sortval: new FormControl(null)
    });
    this.getproductSingleList();
    this.activatedRoute.params.subscribe(data => {
      this.isedit = data['id'] ? true : false
      if (this.isedit) {
        this.modelService.getSingleData(data['id']).subscribe((res: HttpResponse<any>) => {
          this.bannerSubscription = this.productSingleService
            .getProductStream()
            .subscribe((productDetailsList: Product[]) => {
              this.productDetailsList = productDetailsList;
              let x = res.body
              this.form.get('title')?.patchValue(x?.title)
              this.form.get('description')?.patchValue(x?.description)
              this.form.get('image')?.patchValue(x?.imagePath)
              this.form.get('id')?.patchValue(x?._id)
              this.form.get('sortval')?.patchValue(x?.sortval)
              const commonElements = productDetailsList.filter((a: any) => x.productdetails.some((b: any) => a._id === b._id));
              this.form.get('productdetails')?.patchValue(commonElements)
            });


        })
      }

    })
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    console.log(file)
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.isedit) {
      this.modelService.addModel(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.productdetails, this.form.value.sortval);
      this.form.reset();
      this.imageData = null;
    }
    else {
      this.modelService.updateSingleData(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.productdetails, this.form.value.id, this.form.value.sortval);
      this.form.reset();
      this.imageData = null;
    }

  }
  getproductSingleList(): void {
    this.productSingleService.getProduct();
    this.bannerSubscription = this.productSingleService
      .getProductStream()
      .subscribe((productDetailsList: Product[]) => {
        this.productDetailsList = productDetailsList;
      });
  }
}

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
import { SubCategotyService } from "../../../services/subCategoty.service";
import { subCategoty } from "../../../models/subCategoty";


@Component({
  selector: "app-create-subCategoty",
  templateUrl: "./create-subCategoty.component.html",
  styleUrls: ["./create-subCategoty.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule]
})
export class EditSubCategotyComponent implements OnInit {
  form!: FormGroup;
  product!: Product;
  imageData!: any;
  brandList: any = [];
  SubCategotySubscription: any;
  isedit: boolean = false;

  constructor(private subCategotyService: SubCategotyService, private router: Router, private brandService: BrandService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      brand: new FormControl(null),
      id: new FormControl(null),
      title: new FormControl(null)
    });
    this.getproductSingleList();
    this.activatedRoute.params.subscribe(data => {
      this.isedit = data['id'] ? true : false
      if (this.isedit) {
        this.subCategotyService.getFindByIdsubCategoty(data['id']).subscribe((res: HttpResponse<any>) => {
          this.SubCategotySubscription = this.brandService
            .getBrandStream()
            .subscribe((brand: any) => {
              this.brandList = brand;
              let x = res.body
              this.form.get('title')?.patchValue(x?.title)
              this.form.get('id')?.patchValue(x?._id)
              this.form.get('code')?.patchValue(x?.code)
              const commonElements = brand.filter((a: any) => x.brand.some((b: any) => a._id === b._id));
              this.form.get('brand')?.patchValue(commonElements)
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
      this.subCategotyService.addsubCategoty(this.form.value.brand, this.form.value.title);
      this.form.reset();
      this.imageData = null;
    }
    else {
      this.subCategotyService.updateSingleData(this.form.value.brand, this.form.value.id, this.form.value.title);
      this.form.reset();
      this.imageData = null;
    }

  }
  getproductSingleList(): void {
    this.brandService.getBrands();
    this.SubCategotySubscription = this.brandService
      .getBrandStream()
      .subscribe((brand: any) => {
        this.brandList = brand;
      });
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Banner } from "../../../models/banner";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { BrandService } from "../../../services/brand.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModelService } from "../../../services/model.service";
import { Model } from "../../../models/model";


@Component({
  selector: "app-create-brand",
  templateUrl: "./create-brand.component.html",
  styleUrls: ["./create-brand.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule]
})
export class CreateBrandComponent implements OnInit {
  form!: FormGroup;
  banner!: Banner;
  imageData!: any;
  modelList: any = [];
  modelSubscription: any;
  isedit: boolean = false;

  constructor(private brandService: BrandService, private router: Router, private modelService: ModelService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl('/assets/img/imgepre.jpg', Validators.required),
      model: new FormControl(null),
      id: new FormControl(null),
      code: new FormControl(null),
    });
    this.getModelList()

    this.activatedRoute.params.subscribe(data => {
      this.isedit = data['id'] ? true : false
      if (this.isedit) {
        this.brandService.getSingleData(data['id']).subscribe((res: HttpResponse<any>) => {
          this.modelSubscription = this.modelService
            .getModelStream()
            .subscribe((model: Model[]) => {
              this.modelList = model;
              let x = res.body
              this.form.get('title')?.patchValue(x.title)
              this.form.get('description')?.patchValue(x.description)
              this.form.get('code')?.patchValue(x.code)
              this.form.get('image')?.patchValue(x.imagePath)
              const commonElements = model?.filter((a: any) => x.model?.some((b: any) => a._id === b._id));
              this.form.get('model')?.patchValue(commonElements)
              this.form.get('id')?.patchValue(x._id)

            });

        })
      }

    })
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
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
      this.brandService.addBrand(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.model, this.form.value.code, this.form);
    }
    else {
      this.brandService.updateSingleData(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.model, this.form.value.id, this.form.value.code, this.form);
    }


  }
  getModelList(): void {
    this.modelService.getModel();
    this.modelSubscription = this.modelService
      .getModelStream()
      .subscribe((model: Model[]) => {
        this.modelList = model;
      });
  }
}

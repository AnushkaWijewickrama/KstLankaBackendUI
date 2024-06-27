import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormArray, FormBuilder } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product";
import { BrandService } from "../../../services/brand.service";
import { ProductSingleService } from "../../../services/productsingle.service";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { EventSingleService } from "../../../services/event.service";


@Component({
  selector: "app-create-event",
  templateUrl: "./create-event-single.component.html",
  styleUrls: ["./create-event-single.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule, AngularEditorModule]
})
export class EventComponent implements OnInit {
  form!: FormGroup;
  product!: Product;
  imageData!: any;
  brandList: any = [];
  bannerSubscription: any;
  isedit: boolean = false;

  constructor(private eventService: EventSingleService, private router: Router, private brandService: BrandService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      longDescription: new FormControl(null),
      image: this.fb.array([]),
      id: new FormControl(null),
    });
    this.activatedRoute.params.subscribe(data => {
      this.isedit = data['id'] ? true : false
      if (this.isedit) {
        this.eventService.getSingleData(data['id']).subscribe((res: HttpResponse<any>) => {
          let x = res.body
          this.form.get('title')?.patchValue(x.title)
          this.form.get('description')?.patchValue(x.description)
          this.form.get('longDescription')?.patchValue(x.longDescription)
          this.form.get('model')?.patchValue(x.model)
          this.form.get('id')?.patchValue(x._id)
          x?.imagePath?.forEach((image: string) => {
            this.image.push(this.newImage(image));
          });
        })


      }
    })
  }

  onFileSelect(event: any, index: number) {
    const file = event.target.files[0];
    this.image.at(index).patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image.at(index).patchValue({ imagePreview: reader.result as string });

      };
      reader.readAsDataURL(file);
    }
  }
  get image(): FormArray {
    return this.form.get("image") as FormArray
  }
  newImage(imagePreview?: any): FormGroup {
    return this.fb.group({
      image: imagePreview,
      imagePreview: imagePreview
    })
  }
  addImage() {
    this.image.push(this.newImage());
  }
  removeimage(i: number) {
    this.image.removeAt(i);
  }

  onSubmit() {
    if (!this.isedit) {
      this.eventService.addevent(this.form.value.title, this.image.value, this.form.value.description, this.form.value.longDescription);
      this.form.reset()
      this.image.reset()
      this.imageData = null;
    }
    else {
      this.eventService.updateSingleData(this.form.value.title, this.image.value, this.form.value.description, this.form.value.longDescription, this.form.value.id);
      this.form.reset()
      this.image.reset()
      this.imageData = null;
    }



  }
}

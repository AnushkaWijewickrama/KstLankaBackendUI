import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { Client } from "../../../models/client";
import { ClientService } from "../../../services/client.service";


@Component({
  selector: "app-create-client",
  templateUrl: "./create-client.component.html",
  styleUrls: ["./create-client.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule]
})
export class CreateClientComponent implements OnInit {
  form!: FormGroup;
  client!: Client;
  imageData!: any;
  brandList: any = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      brand: new FormControl(null),
    });
    this.getBrand();
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
    console.log(this.form.value.brand)
    this.clientService.addBanner(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.brand);
    this.form.reset();
    this.imageData = null;

  }
  getBrand(): void {
    this.clientService.query().subscribe(res => {
      this.brandList = res.body.brand
    })
  }
}

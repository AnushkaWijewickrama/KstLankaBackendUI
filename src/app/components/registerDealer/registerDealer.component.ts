import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { DealerService } from "../../services/dealer.service";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { SERVER_API_URL } from "../../util/common-util";
import { PdfThumbnailComponent } from "../pdf-thumbnail/pdf-thumbnail.component";


@Component({
  selector: "app-registerDealer",
  templateUrl: "./registerDealer.component.html",
  styleUrls: ["./registerDealer.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule, NgxExtendedPdfViewerModule, AngularEditorModule, PdfThumbnailComponent, NgIf]
})
export class CreateregisterDealerComponent implements OnInit {
  form!: FormGroup;
  selectedPDF: any;
  finalURl!: string;

  constructor(private dealerService: DealerService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      pdf: new FormControl(null, Validators.required),
      longDescription: new FormControl(null, Validators.required),
      pdfLink: new FormControl(null)
    });
    this.getproductSingleList();
  }

  onPdfFileSelect(event: any) {
    const file = event.target.files[0];
    const allowedMimeTypes = ["application/pdf"];
    if (file && allowedMimeTypes.includes(file.type)) {
      this.form.patchValue({ pdf: file });
      this.form.patchValue({ pdfLink: SERVER_API_URL + '/registerDealer/' + file.name + '.pdf' });
    }
  }
  onSubmit() {
    this.dealerService.addDealer(this.form.value.title, this.form.value.pdf, this.form.value.longDescription).subscribe(() => {
      this.form.reset();
      this.getproductSingleList()
      alert('Submitted')
    });

  }
  getproductSingleList(): void {
    this.dealerService.query().subscribe((res: HttpResponse<any>) => {
      this.selectedPDF = res?.body?.pdf
      this.form.patchValue({ 'longDescription': res.body.longDescription })
      this.form.patchValue({ 'title': res.body?.title })
      this.form.patchValue({ 'pdfLink': res.body?.pdfLink })
      this.form.patchValue({ 'pdf': res.body?.pdf })

    })


  }
  get escapedLink(): any {
    const url = this.form.value.pdfLink;
    return `&lt;a href="${url}"&gt;${url}&lt;/a&gt;`;
  }
}

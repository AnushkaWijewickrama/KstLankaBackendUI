import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-thumbnail',
  templateUrl: './pdf-thumbnail.component.html',
  styleUrls: ['./pdf-thumbnail.component.css'],
  standalone: true
})
export class PdfThumbnailComponent implements OnInit {
  @Input() pdfUrl!: string;
  @Input() pageNumber: number = 1;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  async ngOnInit() {
    // Use local worker from assets folder
    (pdfjsLib.GlobalWorkerOptions as any).workerSrc = '/assets/pdf.worker.min.mjs';

    const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(this.pageNumber);

    const viewport = page.getViewport({ scale: 0.3 });
    const canvas = this.canvasRef.nativeElement;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d')!;
    await page.render({ canvasContext: context, viewport }).promise;
  }
}

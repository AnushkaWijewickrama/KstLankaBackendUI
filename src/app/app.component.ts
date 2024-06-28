import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainComponent } from "./components/main/main.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthComponent } from "./components/auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, MainComponent, NgxSpinnerModule, AuthComponent]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

}

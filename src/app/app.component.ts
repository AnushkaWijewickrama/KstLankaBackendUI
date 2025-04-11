import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NgIf } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, SidebarComponent, NgIf, NgxSpinnerModule]
})
export class AppComponent implements OnInit {
  isLoginPage = false;

  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Show spinner when navigation starts
        this.spinner.show();

        // Check if the route is 'login'
        this.isLoginPage = event.url === '/login';
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        // Hide spinner when navigation ends
        this.spinner.hide();
      }
    });
  }
}


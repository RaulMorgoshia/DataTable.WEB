import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { provideHttpClient } from "@angular/common/http";

// Bootstrapping the Angular application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Providing the router with the routes configuration
    provideHttpClient(), // Enabling HttpClient
  ]
});
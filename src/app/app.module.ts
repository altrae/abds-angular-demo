import { CUSTOM_ELEMENTS_SCHEMA, NgModule, provideZoneChangeDetection } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideZoneChangeDetection()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

import { enableProdMode } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { defineCustomElements } from "@abds/components/dist/loader";

if (environment.production) enableProdMode();

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((error) => console.error(error));

defineCustomElements();

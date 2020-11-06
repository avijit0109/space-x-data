import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FilterButtonComponent } from "./dashboard/filter-button/filter-button.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { LoadingInterceptor } from './services/loading.interceptor';
import { ResultCardsComponent } from './result-cards/result-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterButtonComponent,
    SpinnerComponent,
    ResultCardsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

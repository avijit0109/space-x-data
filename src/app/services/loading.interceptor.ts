import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "./spinner.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.show();
    return next
      .handle(request)
      .pipe(finalize(() => this.spinnerService.hide()));
  }
}

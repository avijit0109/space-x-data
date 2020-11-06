import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent implements OnInit {
  public loading: boolean;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.loaderState.subscribe((loaderState) => {
      console.log('dddss');
      
      this.loading = loaderState;
    });
  }
}

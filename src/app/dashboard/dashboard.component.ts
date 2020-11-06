import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public filterRange = this.range(2006, 2020);
  public launches$: Observable<any>;
  currentYear: number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const launch_year = params.launch_year;
      const launch_success = params.launch_success;
      const land_success = params.land_success;

      if (!launch_year && !launch_year && !launch_year) {
        this.launches$ = this.getAllLaunchesData();
      }
    });
  }

  getAllLaunchesData(): Observable<any> {
    return this.dataService.getAllLaunches();
  }

  range(start: number, end: number): number[] {
    return Array(end - start + 1)
      .fill(0)
      .map((val, idx) => start + idx);
  }

  filterYearSelection(val) {
    this.currentYear = val;
    // this.launches$ = this.dataService.getLaunchFilterData(val);
    this.router.navigate([""], {
      relativeTo: this.route,
      queryParams: {
        launch_year: val,
      },
      queryParamsHandling: "merge",
    });
  }

  filterLandingSelection(val) {
    // this.launches$ = this.dataService.getLaunchFilterData(val);
    this.router.navigate([""], {
      relativeTo: this.route,
      queryParams: {
        land_success: val,
      },
      queryParamsHandling: "merge",
    });
  }

  filterLaunchSelection(val) {
    // this.launches$ = this.dataService.getLaunchFilterData(val);
    this.router.navigate([""], {
      relativeTo: this.route,
      queryParams: {
        launch_success: val,
      },
      queryParamsHandling: "merge",
    });
  }
}

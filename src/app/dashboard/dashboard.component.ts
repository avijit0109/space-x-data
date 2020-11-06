import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DataService } from "../services/data.service";
import FilterKeys from "../shared/constants";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public filterRange = this.range(2006, 2020);
  public launches$: Observable<any>;
  currentYear: number;
  constants = FilterKeys;

  filterState = {
    [FilterKeys.LAUNCH_YEAR]: null,
    [FilterKeys.LAUNCH_SUCCESS]: null,
    [FilterKeys.LAND_SUCCESS]: null,
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((params) => {
        if (
          params.hasOwnProperty(FilterKeys.LAUNCH_YEAR) ||
          params.hasOwnProperty(FilterKeys.LAUNCH_SUCCESS) ||
          params.hasOwnProperty(FilterKeys.LAND_SUCCESS)
        ) {
          const query = this.applyFilter(params);
          this.launches$ = this.getFilteredResults(query);
        } else {
          this.launches$ = this.getAllLaunchesData();
        }
      });
  }

  /**
   * Function to construct query and fetch filtered results from server
   * @param params - current state of queryParams on load of the page / on change of filter
   */
  applyFilter(params: { [s: string]: unknown } | ArrayLike<unknown>): string {
    const query = [];
    for (const [key, value] of Object.entries(params)) {
      query.push(`${key}=${value}`);
    }

    return query.join("&");
  }

  /**
   * Function to get all the datas on first load  of the app without any filter
   */
  getAllLaunchesData(): Observable<any> {
    return this.dataService.getAllLaunches();
  }

  /**
   * Function to return filtered data on selection of any filter
   * @param query - custom query based on filters from the URL
   */
  getFilteredResults(query: string): Observable<any> {
    return this.dataService.getFilterData(query);
  }

  /**
   * Function to return all the values within a range in an array
   * @param start - starting val
   * @param end - ending val
   */
  range(start: number, end: number): number[] {
    return Array(end - start + 1)
      .fill(0)
      .map((val, idx) => start + idx);
  }

  /**
   * Function to update the current filter state and parallely update the queryparams in the URL
   * @param {string} identifier - key of the filterstate object to update
   * @param val - the value to update
   */
  filterSelection(identifier: string, val: any) {
    this.filterState[identifier] = val;
    this.router.navigate([""], {
      relativeTo: this.route,
      queryParams: {
        [identifier]: val,
      },
      queryParamsHandling: "merge",
    });
  }

  // filterLandingSelection(val: any) {
  //   this.router.navigate([""], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       land_success: val,
  //     },
  //     queryParamsHandling: "merge",
  //   });
  // }

  // filterLaunchSelection(val: any) {
  //   this.router.navigate([""], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       launch_success: val,
  //     },
  //     queryParamsHandling: "merge",
  //   });
  // }
}

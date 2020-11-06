import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { DataService } from '../services/data.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public filterRange = this.range(2006, 2020);
  public launches$: Observable<any>;
  
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.launches$ = this.getAllLaunchesData();
    this.launches$.subscribe(res => {
      console.log('{{{{', res);
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

  filterSelection(val) {
    this.launches$ = this.dataService.getLaunchFilterData(val);
  }
}

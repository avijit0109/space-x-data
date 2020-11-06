import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

const API_PREFIX = "https://api.spaceXdata.com/v3/launches?limit=100";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Get all spacXdata
   */

  getAllLaunches(): Observable<any> {
    return this.http.get(API_PREFIX, {}).pipe(catchError(this.handleError));
  }

  // Launch & Land Success/Failure Filter
  getFilterData(query: string) {
    return this.http
      .get(`${API_PREFIX}&${query}`, {})
      .pipe(catchError(this.handleError));
  }

  // Launch Success / failure Filter
  getLaunchFilterData(launch = true) {
    return this.http
      .get(`${API_PREFIX}&launch_success=${launch}`, {})
      .pipe(catchError(this.handleError));
  }

  // Launch & Land Success/Failure Filter
  getLandFilterData(land = true, launch = true) {
    return this.http
      .get(`${API_PREFIX}&launch_success=${launch}&land_success=${land}`, {})
      .pipe(catchError(this.handleError));
  }

  // Launch & Land Success/Failure Filter Per Year
  getLaunchsDataPerYear(year: number, land = true, launch = true) {
    return this.http
      .get(
        `${API_PREFIX}&launch_success=${launch}&land_success=${land}&launch_year=${year}`,
        {}
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

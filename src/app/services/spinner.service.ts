import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  subject = new Subject<boolean>();
  loaderState = this.subject.asObservable();

  constructor() { }

  show() {
    this.subject.next(true);
  }

  hide() {
    this.subject.next(false);
  }
}

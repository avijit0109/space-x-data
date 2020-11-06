import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-filter-button",
  templateUrl: "./filter-button.component.html",
  styleUrls: ["./filter-button.component.css"],
})
export class FilterButtonComponent implements OnInit {
  @Input() filterVal: any;
  selectedVal: any;

  @Input()
  set currentVal(val: any) {
    this._selectedVal = val;
  }
  get currentVal(): any {
    return this._selectedVal;
  }

  private _selectedVal = null;

  ngOnInit() {}
  
  isEqual() {
    return String(this.filterVal).toLowerCase() === String(this.currentVal).toLowerCase()
  }
}

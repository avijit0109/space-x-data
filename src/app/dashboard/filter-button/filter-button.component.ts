import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-filter-button",
  templateUrl: "./filter-button.component.html",
  styleUrls: ["./filter-button.component.css"],
})
export class FilterButtonComponent implements OnInit {
  @Input() filterVal: any;
  constructor() {}

  ngOnInit() {}
}

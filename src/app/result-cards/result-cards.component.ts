import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-result-cards",
  templateUrl: "./result-cards.component.html",
  styleUrls: ["./result-cards.component.css"],
})
export class ResultCardsComponent implements OnInit {
  @Input() launchData: any;
  constructor() {}

  ngOnInit() {}
}

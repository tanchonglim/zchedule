import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Input } from "@angular/core";
import { GlobalEventService } from "src/app/core/service/global-event.service";

/**
 * pass empty array if no tabs
 */
export interface PageHeaderProps {
  title: string;
  tabs: Array<string>;
}

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"],
})
export class PageHeaderComponent implements OnInit {
  @Input() properties: PageHeaderProps;

  @Input() selectedTab?: number = 0;
  @Output() selectedTabChange = new EventEmitter();

  constructor(private ge: GlobalEventService) {}

  ngOnInit() {}

  changeTab(number) {
    this.ge.scrollEvent.emit(true);
    this.selectedTab = number;
    this.selectedTabChange.emit(number);
  }
}

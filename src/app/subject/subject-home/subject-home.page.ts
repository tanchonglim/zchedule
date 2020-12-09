import { Component, OnInit } from "@angular/core";
import { GlobalEventService } from "src/app/core/service/global-event.service";
import { PageHeaderProps } from "./../../shared/components/page-header/page-header.component";

@Component({
  selector: "app-subject-home",
  templateUrl: "./subject-home.page.html",
  styleUrls: ["./subject-home.page.scss"],
})
export class SubjectHomePage implements OnInit {
  pageHeaderProps: PageHeaderProps = {
    title: "Subject",
    tabs: ["List", "Analysis"],
  };
  selectedTab: number = 0;
  constructor(private ge: GlobalEventService) {}

  ngOnInit() {}

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }
}

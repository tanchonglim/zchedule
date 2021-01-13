import { Component, OnInit } from "@angular/core";
import { GlobalEventService } from "src/app/core/service/global-event.service";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";
import { LecturerServiceService } from "../lecturer-service.service";

@Component({
  selector: "app-lecturer-home-page",
  templateUrl: "./lecturer-home-page.page.html",

  styleUrls: ["./lecturer-home-page.page.scss"],
})
export class LecturerHomePagePage implements OnInit {
  pageHeaderProps: PageHeaderProps = null;
  selectedTab: number = 0;

  constructor(
    private ge: GlobalEventService,
    private ls: LecturerServiceService
  ) {}

  async ngOnInit() {
    if (await this.ls.isAdmin()) {
      this.pageHeaderProps = {
        title: "Lecturer",
        tabs: ["List", "Analysis"],
      };
    } else {
      this.pageHeaderProps = {
        title: "Lecturer",
        tabs: [],
      };
    }
  }

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }
}

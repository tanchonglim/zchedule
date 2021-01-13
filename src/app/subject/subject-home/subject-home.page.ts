import { Component, OnInit } from "@angular/core";
import { GlobalEventService } from "src/app/core/service/global-event.service";
import { SubjectServiceService } from "../subject-service.service";
import { PageHeaderProps } from "./../../shared/components/page-header/page-header.component";

@Component({
  selector: "app-subject-home",
  templateUrl: "./subject-home.page.html",
  styleUrls: ["./subject-home.page.scss"],
})
export class SubjectHomePage implements OnInit {
  pageHeaderProps: PageHeaderProps = null;
  selectedTab: number = 0;
  constructor(
    private ge: GlobalEventService,
    private ss: SubjectServiceService
  ) {}

  async ngOnInit() {
    if (await this.ss.isAdmin()) {
      this.pageHeaderProps = {
        title: "Subject",
        tabs: ["List", "Analysis"],
      };
    } else {
      this.pageHeaderProps = {
        title: "Subject",
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

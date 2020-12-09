import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LecturerServiceService } from "./../lecturer-service.service";

import { GlobalEventService } from "src/app/core/service/global-event.service";
import { Router } from "@angular/router";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-lecturer-home-page",
  templateUrl: "./lecturer-home-page.page.html",

  styleUrls: ["./lecturer-home-page.page.scss"],
})
export class LecturerHomePagePage implements OnInit {
  pageHeaderProps: PageHeaderProps = {
    title: "Lecturer",
    tabs: ["List", "Analysis"],
  };
  selectedTab: number = 0;

  constructor(
    public modal: ModalController,
    private ge: GlobalEventService,
    public router: Router
  ) {}

  ngOnInit() {}

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }
}

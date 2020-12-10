import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GlobalEventService } from "src/app/core/service/global-event.service";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",

  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  pageHeaderProps: PageHeaderProps = {
    title: "Student",
    tabs: [],
  };

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

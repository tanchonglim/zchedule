import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GlobalEventService } from "./../../core/service/global-event.service";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-room-home",
  templateUrl: "./room-home.page.html",
  styleUrls: ["./room-home.page.scss"],
})
export class RoomHomePage implements OnInit {
  pageHeaderProps: PageHeaderProps = {
    title: "Room",
    tabs: ["List", "Availability"],
  };
  selectedTab: number = 0;

  constructor(public modal: ModalController, private ge: GlobalEventService) {}

  ngOnInit() {}

  async ionViewDidEnter() {}

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }
}

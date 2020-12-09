import { Component, OnInit } from "@angular/core";
import { IonContent, ModalController } from "@ionic/angular";
import { GlobalEventService } from "src/app/core/service/global-event.service";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",

  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  // @ViewChild(IonContent) content: IonContent;

  pageHeaderProps: PageHeaderProps = {
    title: "Student",
    tabs: [],
  };

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

  // scrollToTop() {
  //   this.content.scrollToTop(400);
  // }
}

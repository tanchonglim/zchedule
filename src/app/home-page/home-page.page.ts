import { Component, OnInit } from "@angular/core";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { HomeServiceService } from "./home-service.service";
import { GlobalEventService } from "../core/service/global-event.service";
import { RegisteredSubjectListData } from "../shared/components/list-subject/list-subject.component";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
  user: User;
  timetableData: TimetableData;
  registeredSubjectListData: Array<RegisteredSubjectListData> = [];

  tabs = [
    {
      label: "Timetable",
      icon: "calendar",
    },
    {
      label: "Subject",
      icon: "library",
    },
  ];
  selectedTab: number = 0;

  constructor(private hs: HomeServiceService, private ge: GlobalEventService) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    console.log("enter home");
    this.user = await this.hs.getCurrentuser();
    this.getTimetableData();
    this.getSubjectData();
  }

  async getTimetableData() {
    this.timetableData = await this.hs.getTimetable(this.user.login_name);
  }

  async getSubjectData() {
    this.registeredSubjectListData = await this.hs.getStudentSubjects(
      this.user.login_name
    );
  }

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }

  selectTab(i) {
    this.selectedTab = i;
  }
}

import { Component, OnInit } from "@angular/core";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { HomeServiceService } from "./home-service.service";
import { GlobalEventService } from "../core/service/global-event.service";
import { RegisteredSubjectListData } from "../shared/components/list-subject/list-subject.component";
import { Auth } from "src/app/shared/models/Auth";

// import { ChartDataSets, ChartOptions } from "chart.js";
// import { Color, Label } from "ng2-charts";

// import { GoogleChartInterface } from "ng2-google-charts";
// declare var google;

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
  authUser: Auth;
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
    this.authUser = await this.hs.getCurrentuser();
    this.getTimetableData();
    this.getSubjectData();
  }

  async getTimetableData() {
    this.timetableData = await this.hs.getTimetable(this.authUser.login_name);
  }

  async getSubjectData() {
    this.registeredSubjectListData = await this.hs.getStudentSubjects(
      this.authUser.login_name
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

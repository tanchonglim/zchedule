import { Component, OnInit } from "@angular/core";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { HomeServiceService } from "./home-service.service";
import { GlobalEventService } from "../core/service/global-event.service";
import { RegisteredSubjectListData } from "../shared/components/list-subject/list-subject.component";
import { Auth } from "src/app/shared/models/Auth";

import { GoogleChartInterface } from "ng2-google-charts";
declare var google;

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

  show() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Topping");
    data.addColumn("number", "Slices");
    data.addRows([
      ["Mushrooms", 3],
      ["Onions", 1],
      ["Olives", 1],
      ["Zucchini", 1],
      ["Pepperoni", 2],
    ]);

    // Set chart options
    var options = {
      title: "How Much Pizza I Ate Last Night",
      width: 500,
      height: 300,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(
      document.getElementById("chart")
    );
    chart.draw(data, options);
  }
}

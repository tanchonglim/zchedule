import { Component, OnInit } from "@angular/core";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { HomeServiceService } from "./home-service.service";
import { GlobalEventService } from "../core/service/global-event.service";
import { RegisteredSubjectListData } from "../shared/components/list-subject/list-subject.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
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
  id: string;
  timetableData: TimetableData;
  registeredSubjectListData: Array<RegisteredSubjectListData> = [];

  constructor(private hs: HomeServiceService, private ge: GlobalEventService) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.id = this.hs.getID();
    this.getTimetableData();
    this.getSubjectData();
  }

  async getTimetableData() {
    this.timetableData = await this.hs.getTimetable(this.id);
  }

  async getSubjectData() {
    this.registeredSubjectListData = await this.hs.getStudentSubjects(this.id);
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

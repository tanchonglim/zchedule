import { Component, OnInit } from "@angular/core";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { HomeServiceService } from "./home-service.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
  displayingComponent: number = 0; // 0 for timetable, 1 for subject list
  timetableData: TimetableData;

  constructor(private hs: HomeServiceService) {}

  async ngOnInit() {
    const id = this.hs.getID();
    const sesiSemester = await this.hs.getCurrentSesiSem();
    this.timetableData = await this.hs.getTimetable(
      id,
      sesiSemester.sesi,
      sesiSemester.semester
    );
  }

  get isDataLoaded() {
    return this.timetableData;
  }

  segmentChanged(event) {
    this.displayingComponent = Number(event.detail.value);
  }
}

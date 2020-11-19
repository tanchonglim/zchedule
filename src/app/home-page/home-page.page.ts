import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/models/TimetableData";
import { StudentServiceService } from "../student/student-service.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
  displayingComponent: number = 0; // 0 for timetable, 1 for subject list
  timetableData: TimetableData;

  constructor(
    private ss: StudentServiceService,
    private ds: DataServiceService
  ) {}

  async ngOnInit() {
    const id = this.ds.getID();
    const sesiSemester = await this.ds.getCurrentSesiSem();
    this.timetableData = await this.ss.getTimetable(
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

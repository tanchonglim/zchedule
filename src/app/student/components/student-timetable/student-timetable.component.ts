import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/core/service/data-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { StudentServiceService } from "../../student-service.service";
import { TimetableData } from "../../../shared/models/TimetableData";

@Component({
  selector: "app-student-timetable",
  templateUrl: "./student-timetable.component.html",
  styleUrls: ["./student-timetable.component.scss"],
})
export class StudentTimetableComponent implements OnInit {
  currentSesiSem: SesiSemester;
  timetableData: TimetableData;

  constructor(
    private studentService: StudentServiceService,
    private ds: DataServiceService
  ) {}

  async ngOnInit() {
    this.currentSesiSem = (await this.ds.getSesiSemester())[0];

    this.timetableData = await this.studentService.getTimetable(
      this.ds.getID(),
      this.currentSesiSem.sesi,
      this.currentSesiSem.semester
    );
  }

  get isDataLoaded() {
    return this.currentSesiSem && this.timetableData;
  }
}

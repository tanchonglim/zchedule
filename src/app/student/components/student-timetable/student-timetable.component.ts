import { Component, Input, OnInit } from "@angular/core";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { StudentServiceService } from "../../student-service.service";
import { TimetableData } from "../../../shared/models/TimetableData";

@Component({
  selector: "app-student-timetable",
  templateUrl: "./student-timetable.component.html",
  styleUrls: ["./student-timetable.component.scss"],
})
export class StudentTimetableComponent implements OnInit {
  @Input() id: string;
  currentSesiSem: SesiSemester;
  timetableData: TimetableData;

  constructor(private ss: StudentServiceService) {}

  async ngOnInit() {
    this.currentSesiSem = await this.ss.getCurrentSesiSem();

    this.timetableData = await this.ss.getTimetable(
      this.id,
      this.currentSesiSem.sesi,
      this.currentSesiSem.semester
    );
  }

  get isDataLoaded() {
    return this.currentSesiSem && this.timetableData;
  }
}

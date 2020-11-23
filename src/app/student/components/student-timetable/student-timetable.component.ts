import { Component, Input, OnInit } from "@angular/core";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { StudentServiceService } from "../../student-service.service";

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

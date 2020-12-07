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
  timetableData: TimetableData;

  constructor(private ss: StudentServiceService) {}

  async ngOnInit() {
    await this.getTimetableData(this.id);
  }

  async getTimetableData(id) {
    this.timetableData = await this.ss.getTimetable(id);
  }

  get isDataLoaded() {
    return this.timetableData;
  }
}

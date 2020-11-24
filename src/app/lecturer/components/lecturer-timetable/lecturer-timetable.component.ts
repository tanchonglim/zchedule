import { Component, Input, OnInit } from "@angular/core";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { LecturerServiceService } from "../../lecturer-service.service";

@Component({
  selector: "app-lecturer-timetable",
  templateUrl: "./lecturer-timetable.component.html",
  styleUrls: ["./lecturer-timetable.component.scss"],
})
export class LecturerTimetableComponent implements OnInit {
  @Input() id: string;
  currentSesiSem: SesiSemester;
  timetableData: TimetableData;

  constructor(private ls: LecturerServiceService) {}

  async ngOnInit() {
    this.currentSesiSem = await this.ls.getCurrentSesiSem();
    console.log(this.id);
    await this.getTimetableData(this.id);
  }

  async getTimetableData(id) {
    this.timetableData = await this.ls.getTimetable(
      id,
      this.currentSesiSem.sesi,
      this.currentSesiSem.semester
    );
  }

  get isDataLoaded() {
    return this.currentSesiSem && this.timetableData;
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/core/service/data-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { TimetableData } from "src/app/shared/models/TimetableData";
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

  constructor(
    private lecturerService: LecturerServiceService,
    private ds: DataServiceService
  ) {}

  async ngOnInit() {
    this.currentSesiSem = (await this.ds.getSesiSemester())[0];
    console.log(this.id);
    this.timetableData = await this.lecturerService.getTimetable(
      this.id,
      this.currentSesiSem.sesi,
      this.currentSesiSem.semester
    );
  }

  get isDataLoaded() {
    return this.currentSesiSem && this.timetableData;
  }
}

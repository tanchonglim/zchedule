import { Component, Input, OnInit } from "@angular/core";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { SubjectServiceService } from "../../subject-service.service";

@Component({
  selector: "app-subject-detail",
  templateUrl: "./subject-detail.component.html",
  styleUrls: ["./subject-detail.component.scss"],
})
export class SubjectDetailComponent implements OnInit {
  @Input() subjectName: string;
  @Input() subjectCode: string;
  @Input() section: number;

  timetableData: TimetableData;

  constructor(private ss: SubjectServiceService) {}

  async ngOnInit() {
    console.log(this.subjectCode, this.section);
  }

  get isDataLoaded() {
    // return this.subjectSections;
    return true;
  }
}

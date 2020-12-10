import { Component, Input, OnInit } from "@angular/core";
import { ModalHeaderProps } from "src/app/shared/components/modal-header/modal-header.component";
import { Lecturer } from "./../../../shared/models/Lecturer";
import { TimetableData } from "./../../../shared/components/timetable-subjects/timetable-subjects.component";
import { LecturerServiceService } from "../../lecturer-service.service";
import { RegisteredSubjectListData } from "./../../../shared/components/list-subject/list-subject.component";

@Component({
  selector: "app-lecturer-detail",
  templateUrl: "./lecturer-detail.component.html",
  styleUrls: ["./lecturer-detail.component.scss"],
})
export class LecturerDetailComponent implements OnInit {
  @Input() lecturer: Lecturer;
  timetableData: TimetableData;
  registeredSubjectListData: Array<RegisteredSubjectListData>;

  headerModalProps: ModalHeaderProps;
  selectedTab: number = 0;

  constructor(private ls: LecturerServiceService) {}

  ngOnInit() {
    this.headerModalProps = {
      title: this.lecturer.nama,
      subtitle: null,
      tabs: ["Info", "Timetable"],
    };
    this.getTimetableData(this.lecturer.no_pekerja);
    this.getLecturerSubject(this.lecturer.no_pekerja);
  }

  async getTimetableData(id) {
    this.timetableData = await this.ls.getTimetable(id);
  }

  async getLecturerSubject(id) {
    this.registeredSubjectListData = await this.ls.getLecturerSubjectData(id);
  }
}

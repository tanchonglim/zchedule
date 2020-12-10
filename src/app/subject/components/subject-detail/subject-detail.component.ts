import { Component, Input, OnInit } from "@angular/core";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { SubjectStudent } from "src/app/shared/models/SubjectStudent";
import { SubjectServiceService } from "../../subject-service.service";
import { ModalHeaderProps } from "./../../../shared/components/modal-header/modal-header.component";

@Component({
  selector: "app-subject-detail",
  templateUrl: "./subject-detail.component.html",
  styleUrls: ["./subject-detail.component.scss"],
})
export class SubjectDetailComponent implements OnInit {
  @Input() subjectName: string;
  @Input() subjectCode: string;
  @Input() sectionInfo: {
    pensyarah: string;
    seksyen: number;
    bil_pelajar: number;
  };

  timetableData: TimetableData;
  subjectStudents: Array<SubjectStudent>;
  filteredsubjectStudents: Array<SubjectStudent>;

  headerModalProps: ModalHeaderProps;
  selectedTab: number = 0;

  constructor(private ss: SubjectServiceService) {}

  ngOnInit() {
    this.headerModalProps = {
      title: `${this.subjectName} - ${
        this.sectionInfo.seksyen < 10
          ? "0" + this.sectionInfo.seksyen
          : this.sectionInfo.seksyen
      }`,
      subtitle: `${this.sectionInfo.pensyarah || " "}`,
      tabs: ["Timetable", "Students"],
    };

    this.getTimetableData();
    this.getSubjectStudents();
  }

  async getTimetableData() {
    this.timetableData = await this.ss.getTimetabledata(
      this.subjectCode,
      this.sectionInfo.seksyen
    );
  }

  async getSubjectStudents() {
    this.subjectStudents = await this.ss.getSubjectStudents(
      this.subjectCode,
      this.sectionInfo.seksyen
    );
    this.filteredsubjectStudents = this.subjectStudents;
    console.log(this.subjectStudents);
  }

  onsearch(event) {
    this.filteredsubjectStudents = this.subjectStudents.filter((student) => {
      return student.nama
        .trim()
        .toLowerCase()
        .includes(event.target.value.trim().toLowerCase());
    });
  }

  clearsearch() {
    this.filteredsubjectStudents = this.subjectStudents;
  }
}

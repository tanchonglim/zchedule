import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { ModalHeaderProps } from "src/app/shared/components/modal-header/modal-header.component";
import { Student } from "src/app/shared/models/Student";
import { StudentServiceService } from "../../student-service.service";
import { RegisteredSubjectListData } from "./../../../shared/components/list-subject/list-subject.component";
import { TimetableData } from "./../../../shared/components/timetable-subjects/timetable-subjects.component";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.scss"],
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  timetableData: TimetableData;
  registeredSubjectListData: Array<RegisteredSubjectListData>;
  headerModalProps: ModalHeaderProps;
  selectedTab: number = 0;

  constructor(private ss: StudentServiceService) {}

  ngOnInit() {
    this.headerModalProps = {
      title: this.student.nama,
      subtitle: null,
      tabs: ["Info", "Timetable"],
    };
    this.getTimetableData(this.student.no_matrik);
    this.getStudentSubject(this.student.no_matrik);
  }

  async getStudentSubject(id: string) {
    this.registeredSubjectListData = await this.ss.getStudentSubjects(id);
  }

  async getTimetableData(id) {
    this.timetableData = await this.ss.getTimetable(id);
  }
}

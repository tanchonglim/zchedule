import { Component, Input, OnInit } from "@angular/core";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { StudentServiceService } from "../../student-service.service";
import { RegisteredSubjectListData } from "src/app/shared/components/list-subject/list-subject.component";

@Component({
  selector: "app-registered-subjects",
  templateUrl: "./registered-subjects.component.html",
  styleUrls: ["./registered-subjects.component.scss"],
})
export class RegisteredSubjectsComponent implements OnInit {
  @Input() id: string;
  studentSubject: Array<StudentSubject>;
  registeredSubjectListData: Array<RegisteredSubjectListData> = [];
  constructor(private ss: StudentServiceService) {}

  async ngOnInit() {
    this.getStudentSubject();
  }

  async getStudentSubject() {
    this.studentSubject = await this.ss.getStudentSubjects(this.id);
    this.studentSubject.forEach((subject) => {
      console.log(subject);
      this.registeredSubjectListData.push({
        nama_subjek: subject.nama_subjek,
        kod_subjek: subject.kod_subjek,
        semester: subject.semester,
        sesi: subject.sesi,
        seksyen: subject.seksyen,
      });
    });
    console.log(this.registeredSubjectListData);
  }
}

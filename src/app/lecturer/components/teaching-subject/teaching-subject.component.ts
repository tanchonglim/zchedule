import { Component, Input, OnInit } from "@angular/core";
import { LecturerServiceService } from "../../lecturer-service.service";
import { LecturerSubject } from "./../../../shared/models/LecturerSubject";
import { RegisteredSubjectListData } from "src/app/shared/components/subject-list/subject-list.component";

@Component({
  selector: "app-teaching-subject",
  templateUrl: "./teaching-subject.component.html",
  styleUrls: ["./teaching-subject.component.scss"],
})
export class TeachingSubjectComponent implements OnInit {
  @Input() id: string;
  lecturerSubject: Array<LecturerSubject>;
  registeredSubjectListData: Array<RegisteredSubjectListData>;
  constructor(private ls: LecturerServiceService) {}

  async ngOnInit() {
    this.lecturerSubject = await this.ls.getLecturerSubject(this.id);
    console.log(this.lecturerSubject[0].bil_pelajar);
    console.log(this.lecturerSubject[0].kod_subjek);
    console.log(this.lecturerSubject);
    this.registeredSubjectListData = this.lecturerSubject.map((subject) => {
      return {
        nama_subjek: subject.nama_subjek,
        kod_subjek: subject.kod_subjek,
        semester: subject.semester,
        sesi: subject.sesi,
        bil_pelajar: subject.bil_pelajar,
      };
    });
  }
}

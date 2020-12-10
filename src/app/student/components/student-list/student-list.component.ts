import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Student } from "src/app/shared/models/Student";
import { StudentServiceService } from "../../student-service.service";
import { StudentDetailComponent } from "../student-detail/student-detail.component";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent implements OnInit {
  filteredStudentList: Array<Student>;
  studentList: Array<Student>;

  searchString: string;
  initialCourse = "SCSJ";
  courses = [
    "SBEA",
    "SBEC",
    "SBEHH",
    "SBEQ",
    "SBEQH",
    "SBEUH",
    "SBEW",
    "SBEWH",
    "SBEZ",
    "SBEZH",
    "SCSB",
    "SCSJ",
    "SCSP",
    "SCSR",
    "SCSV",
    "SEBB",
    "SECB",
    "SECBH",
    "SECJ",
    "SECJH",
    "SECP",
    "SECPH",
    "SECR",
    "SECRH",
    "SECV",
    "SECVH",
    "SEEE",
    "SEEEH",
    "SEEL",
    "SEELH",
    "SEEM",
    "SEMM",
    "SETP",
    "SGHL",
    "SKAW",
    "SKEE",
    "SKEL",
    "SKEM",
    "SKMB",
    "SKMM",
    "SKMO",
    "SKMT",
    "SKTB",
    "SKTG",
    "SKTK",
    "SKTN",
    "SKTP",
    "SMBE",
    "SMBQ",
    "SPPJ",
    "SPPS",
    "SSCA",
    "SSCB",
    "SSCC",
    "SSCG",
    "SSPB",
  ];

  constructor(
    public modal: ModalController,
    private ss: StudentServiceService
  ) {}

  ngOnInit() {
    this.getStudentList(this.initialCourse);
  }

  async getStudentList(course) {
    this.studentList = await this.ss.getStudentList(course);
    this.filteredStudentList = this.studentList;
  }

  async openStudentDetail(student) {
    event.stopPropagation();
    const modal = await this.modal.create({
      component: StudentDetailComponent,
      componentProps: { student: student },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async changeCourse(event) {
    this.searchString = null;
    this.studentList = null;
    let course = event.target.value;
    this.getStudentList(course);
  }

  onsearch(event) {
    if (!this.studentList || !this.studentList.length) return;
    let searchString = event.target.value;
    this.filteredStudentList = this.studentList.filter((student) => {
      if (student.nama && student.no_matrik)
        return (
          student.nama
            .toLowerCase()
            .trim()
            .includes(searchString.trim().toLowerCase()) ||
          student.no_matrik
            .toLowerCase()
            .trim()
            .includes(searchString.trim().toLowerCase())
        );
      else return false;
    });
  }

  clearsearch() {
    this.filteredStudentList = this.studentList;
  }
}

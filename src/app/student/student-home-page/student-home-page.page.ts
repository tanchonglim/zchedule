import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { RegisteredSubjectsComponent } from "../components/registered-subjects/registered-subjects.component";
import { StudentTimetableComponent } from "../components/student-timetable/student-timetable.component";
import { StudentServiceService } from "../student-service.service";
import { Student } from "src/app/shared/models/Student";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",
  animations: [
    trigger("expandCard", [
      transition(":enter", [
        style({
          opacity: 0,
          marginTop: "-10%",
        }),
        animate(
          "300ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({
            marginTop: "0px",
            opacity: "1",
          })
        ),
      ]),
      transition(":leave", [
        style({
          opacity: 1,
          marginTop: "0px",
        }),
        animate(
          "300ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({
            marginTop: "-10%",
            opacity: "0",
          })
        ),
      ]),
    ]),
  ],
  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  searchString: string = "A18CS02";
  courseCode: string = "SCSJ";
  collapse: Array<Boolean> = [];
  filteredStudentList: Array<Student>;

  constructor(
    public modal: ModalController,
    private ss: StudentServiceService
  ) {}

  ngOnInit() {}

  async openSubjectModal(id) {
    const modal = await this.modal.create({
      component: RegisteredSubjectsComponent,
      componentProps: { id: id },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async openTimetableModal(id) {
    const modal = await this.modal.create({
      component: StudentTimetableComponent,
      componentProps: { id: id },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async searchStudent() {
    let courseCode = this.courseCode;
    let searchString = this.searchString;

    if (searchString && courseCode) {
      let studentList = await this.ss.getFilteredStudentList(
        searchString,
        courseCode
      );
      this.filteredStudentList = studentList;
      console.log(studentList);
    } else {
      alert("Please input something");
    }
  }

  expandCard(i) {
    let c = this.collapse[i];
    this.collapse = this.collapse.map((r) => false);
    this.collapse[i] = !c;
  }
}

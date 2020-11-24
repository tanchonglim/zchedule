import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { RegisteredSubjectsComponent } from "../components/registered-subjects/registered-subjects.component";
import { StudentTimetableComponent } from "../components/student-timetable/student-timetable.component";
import { StudentServiceService } from "../student-service.service";
import { Student } from "src/app/shared/models/Student";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",
  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  searchString: string = "A18CS02";
  courseCode: string = "SCSJ";
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
}

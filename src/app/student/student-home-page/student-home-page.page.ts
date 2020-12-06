import { Component, OnInit, ViewChild } from "@angular/core";
import { IonContent, ModalController } from "@ionic/angular";
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
  AUTO_STYLE,
} from "@angular/animations";
import { GlobalEventService } from "src/app/core/service/global-event.service";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",
  animations: [
    trigger("collapse", [
      state("true", style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state("false", style({ height: "0", visibility: "hidden" })),
      transition("false => true", animate(300 + "ms ease-out")),
      transition("true => false", animate(300 + "ms ease-in")),
    ]),
    trigger("rotatedState", [
      state("true", style({ transform: "rotate(0)" })),
      state("false", style({ transform: "rotate(90deg)" })),
      transition("false => true", animate("300ms ease-out")),
      transition("true => false", animate("300ms ease-in")),
    ]),
  ],
  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  // @ViewChild(IonContent) content: IonContent;
  searchString: string = "A18CS02";
  courseCode: string = "SCSJ";
  collapse: Array<Boolean> = [];
  filteredStudentList: Array<Student>;

  constructor(
    public modal: ModalController,
    private ss: StudentServiceService,
    private ge: GlobalEventService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.filteredStudentList = null;
    console.log("std init");
  }

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }

  // scrollToTop() {
  //   this.content.scrollToTop(400);
  // }

  async openSubjectModal(id, event) {
    event.stopPropagation();
    const modal = await this.modal.create({
      component: RegisteredSubjectsComponent,
      componentProps: { id: id },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async openTimetableModal(id, event) {
    event.stopPropagation();
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
      this.collapse = this.filteredStudentList.map((r) => false);
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

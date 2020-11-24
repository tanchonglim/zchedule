import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LecturerTimetableComponent } from "../components/lecturer-timetable/lecturer-timetable.component";
import { TeachingSubjectComponent } from "../components/teaching-subject/teaching-subject.component";

interface lecturerList {
  lectName: string;
  lectId: string;
  lectCourse: string;
}

@Component({
  selector: "app-lecturer-home-page",
  templateUrl: "./lecturer-home-page.page.html",
  styleUrls: ["./lecturer-home-page.page.scss"],
})
export class LecturerHomePagePage implements OnInit {
  id: string;
  course: string;
  lecturerList: Array<lecturerList> = [
    {
      lectName: "ali",
      lectId: "abc",
      lectCourse: "SCSJ",
    },
    {
      lectName: "abu",
      lectId: "abqweqwc",
      lectCourse: "SCSV",
    },
  ];
  isFound: any;
  constructor(public modal: ModalController) {}

  ngOnInit() {}

  async openSubjectModal() {
    const modal = await this.modal.create({
      component: TeachingSubjectComponent,
      componentProps: {
        id: this.id,
      },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async openTimetableModal() {
    console.log(this.id);
    const modal = await this.modal.create({
      component: LecturerTimetableComponent,
      componentProps: { id: this.id },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  // checkLect(){
  //   return this.lecturerList.lectName = this.id;
  // }

  searchLect() {
    console.log(this.id);
    this.isFound = this.lecturerList.find((lect) => {
      return lect.lectName == this.id && lect.lectCourse == this.course;
    });
    console.log(this.isFound);
  }

  getCourse() {
    console.log(this.course);
  }
}

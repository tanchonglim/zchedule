import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { RegisteredSubjectsComponent } from "../components/registered-subjects/registered-subjects.component";
import { StudentTimetableComponent } from "../components/student-timetable/student-timetable.component";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",
  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  constructor(public modal: ModalController) {}

  ngOnInit() {}

  async openSubjectModal() {
    const modal = await this.modal.create({
      component: RegisteredSubjectsComponent,
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async openTimetableModal() {
    const modal = await this.modal.create({
      component: StudentTimetableComponent,
    });
    await modal.present();
    await modal.onWillDismiss();
  }
}

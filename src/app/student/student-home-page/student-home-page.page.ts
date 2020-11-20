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
  viewMode: any = "subject";

  trayArray: any = [
    {
      name: "subject",
      status: 1,
    },
    {
      name: "timetable",
      status: 0,
    },
  ];

  id: string = "A18CS0255";
  constructor(public modal: ModalController) {}

  ngOnInit() {}

  async openSubjectModal() {
    const modal = await this.modal.create({
      component: RegisteredSubjectsComponent,
      componentProps: {
        id: this.id,
      },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async openTimetableModal() {
    const modal = await this.modal.create({
      component: StudentTimetableComponent,
      componentProps: { id: this.id },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  selectTray0() {
    this.viewMode = this.trayArray[0].name;
    if (this.trayArray[0].status == 1) {
      this.trayArray[1].status = 0;
    } else {
      this.trayArray[0].status = 1;
      this.trayArray[1].status = 0;
    }
  }
  selectTray1() {
    this.viewMode = this.trayArray[1].name;
    if (this.trayArray[1].status == 1) {
      this.trayArray[0].status = 0;
    } else {
      this.trayArray[1].status = 1;
      this.trayArray[0].status = 0;
    }
  }
}

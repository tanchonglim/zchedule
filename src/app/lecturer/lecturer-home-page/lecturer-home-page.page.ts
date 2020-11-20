import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LecturerTimetableComponent } from "../components/lecturer-timetable/lecturer-timetable.component";
import { TeachingSubjectComponent } from "../components/teaching-subject/teaching-subject.component";

@Component({
  selector: "app-lecturer-home-page",
  templateUrl: "./lecturer-home-page.page.html",
  styleUrls: ["./lecturer-home-page.page.scss"],
})
export class LecturerHomePagePage implements OnInit {
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

  id: string = "13914";
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

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
}

import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { LecturerTimetableComponent } from "../components/lecturer-timetable/lecturer-timetable.component";
import { TeachingSubjectComponent } from "../components/teaching-subject/teaching-subject.component";
import { LecturerServiceService } from "./../lecturer-service.service";
import { Lecturer } from "./../../shared/models/Lecturer";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from "@angular/animations";

@Component({
  selector: "app-lecturer-home-page",
  templateUrl: "./lecturer-home-page.page.html",
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
  styleUrls: ["./lecturer-home-page.page.scss"],
})
export class LecturerHomePagePage implements OnInit {
  // id: string;
  searchString: string = "a";
  filteredLecturerList: Array<Lecturer>;
  collapse: Array<Boolean> = [];
  constructor(
    public modal: ModalController,
    private ls: LecturerServiceService
  ) {}

  ngOnInit() {}

  async openSubjectModal(id) {
    const modal = await this.modal.create({
      component: TeachingSubjectComponent,
      componentProps: {
        id: id,
      },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async openTimetableModal(id) {
    // console.log(this.id);
    const modal = await this.modal.create({
      component: LecturerTimetableComponent,
      componentProps: { id: id },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  async searchLecturer() {
    if (this.searchString) {
      let lecturertList = await this.ls.getFilteredLecturerList(
        this.searchString
      );
      this.filteredLecturerList = lecturertList;
      this.collapse = this.filteredLecturerList.map((f) => false);
      console.log(lecturertList);
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

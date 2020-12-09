import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Lecturer } from "src/app/shared/models/Lecturer";
import { LecturerServiceService } from "../../lecturer-service.service";
import { LecturerDetailComponent } from "../lecturer-detail/lecturer-detail.component";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from "@angular/animations";

@Component({
  selector: "app-lecturer-list",
  templateUrl: "./lecturer-list.component.html",
  // animations: [
  //   trigger("collapse", [
  //     state("true", style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
  //     state("false", style({ height: "0", visibility: "hidden" })),
  //     transition("false => true", animate(300 + "ms ease-out")),
  //     transition("true => false", animate(300 + "ms ease-in")),
  //   ]),
  //   trigger("rotatedState", [
  //     state("true", style({ transform: "rotate(-90deg)" })),
  //     state("false", style({ transform: "rotate(90deg)" })),
  //     transition("false => true", animate("300ms ease-out")),
  //     transition("true => false", animate("300ms ease-in")),
  //   ]),
  // ],
  styleUrls: ["./lecturer-list.component.scss"],
})
export class LecturerListComponent implements OnInit {
  searchString: string = "a";
  lecturerList: Array<Lecturer>;
  filteredLecturerList: Array<Lecturer>;

  // collapse: Array<Boolean> = [];

  constructor(
    public modal: ModalController,
    private ls: LecturerServiceService
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      this.lecturerList = await this.ls.getLecturerList();
      this.filteredLecturerList = this.lecturerList;
      // this.collapse = this.filteredLecturerList.map(() => false);
    }, 120);
  }

  async openLecturerDetail(lecturer) {
    event.stopPropagation();
    const modal = await this.modal.create({
      component: LecturerDetailComponent,
      componentProps: {
        lecturer: lecturer,
      },
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  onsearch(event) {
    let searchString = event.target.value;
    this.filteredLecturerList = this.lecturerList.filter((lecturer) => {
      if (lecturer.nama && lecturer.no_pekerja) {
        return (
          lecturer.nama
            .toLowerCase()
            .trim()
            .includes(searchString.trim().toLowerCase()) ||
          lecturer.no_pekerja
            .toString()
            .trim()
            .includes(searchString.trim().toLowerCase())
        );
      } else return false;
    });
    // this.collapse = this.filteredLecturerList.map(() => false);
  }

  clearsearch() {
    this.filteredLecturerList = this.lecturerList;
    // this.collapse = this.filteredLecturerList.map(() => false);
  }

  // expandCard(i) {
  //   let c = this.collapse[i];
  //   this.collapse = this.collapse.map((r) => false);
  //   this.collapse[i] = !c;
  // }
}

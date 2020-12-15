import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Lecturer } from "src/app/shared/models/Lecturer";
import { LecturerServiceService } from "../../lecturer-service.service";
import { LecturerDetailComponent } from "../lecturer-detail/lecturer-detail.component";
@Component({
  selector: "app-lecturer-list",
  templateUrl: "./lecturer-list.component.html",
  styleUrls: ["./lecturer-list.component.scss"],
})
export class LecturerListComponent implements OnInit {
  searchString: string = "a";
  lecturerList: Array<Lecturer>;
  filteredLecturerList: Array<Lecturer>;

  constructor(
    public modal: ModalController,
    private ls: LecturerServiceService
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      this.getLecturerList();
    }, 120);
  }

  async getLecturerList() {
    this.lecturerList = await this.ls.getLecturerList();
    this.filteredLecturerList = this.lecturerList;
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
  }

  clearsearch() {
    this.filteredLecturerList = this.lecturerList;
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
}

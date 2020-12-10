import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SubjectServiceService } from "../../subject-service.service";
import { Subject } from "./../../../shared/models/Subject";
import { SubjectInfoComponent } from "./../subject-info/subject-info.component";

@Component({
  selector: "app-subject-list",
  templateUrl: "./subject-list.component.html",
  styleUrls: ["./subject-list.component.scss"],
})
export class SubjectListComponent implements OnInit {
  searchString: string = "scsj";
  subjectList: Array<Subject>;
  filteredSubjectList: Array<Subject>;

  constructor(
    private ss: SubjectServiceService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      this.getSubject();
    }, 100);
  }

  async getSubject() {
    this.subjectList = await this.ss.getSubjects();
    this.filteredSubjectList = this.subjectList;
  }

  async onsearch(event) {
    let searchString = event.target.value;
    this.filteredSubjectList = this.subjectList.filter((subject) => {
      return (
        subject.nama_subjek
          .toLowerCase()
          .trim()
          .includes(searchString.trim().toLowerCase()) ||
        subject.kod_subjek
          .toLowerCase()
          .trim()
          .includes(searchString.trim().toLowerCase())
      );
    });
  }

  clearsearch() {
    this.filteredSubjectList = this.subjectList;
  }

  async viewSubjectDetail(subject: Subject) {
    const modal = await this.modalController.create({
      component: SubjectInfoComponent,
      componentProps: {
        subjectCode: subject.kod_subjek,
      },
      cssClass: "modal-float-bottom",
    });
    await modal.present();
    await modal.onWillDismiss();
  }
}

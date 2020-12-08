import { Component, Input, OnInit } from "@angular/core";
import { SubjectServiceService } from "../../subject-service.service";
import { SubjectSection } from "src/app/shared/models/SubjectSection";
import { ModalController } from "@ionic/angular";
import { SubjectDetailComponent } from "../subject-detail/subject-detail.component";

@Component({
  selector: "app-subject-info",
  templateUrl: "./subject-info.component.html",
  styleUrls: ["./subject-info.component.scss"],
})
export class SubjectInfoComponent implements OnInit {
  @Input() subjectCode: string;
  subjectSections: SubjectSection;
  constructor(
    private ss: SubjectServiceService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    this.subjectSections = await this.ss.getSubjectSections(this.subjectCode);
    console.log(this.subjectSections);
  }

  get isDataLoaded() {
    return this.subjectSections;
  }

  async openSubjectDetailModal(sectionInfo) {
    const modal = await this.modalController.create({
      component: SubjectDetailComponent,
      componentProps: {
        subjectName: this.subjectSections.nama_subjek,
        subjectCode: this.subjectCode,

        sectionInfo: sectionInfo,
      },
    });
    await modal.present();
    await modal.onWillDismiss();
  }
}

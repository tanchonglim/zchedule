import {
  animate,
  AnimationBuilder,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GlobalEventService } from "src/app/core/service/global-event.service";
import { SubjectInfoComponent } from "../components/subject-info/subject-info.component";
import { SubjectServiceService } from "../subject-service.service";
import { Subject } from "./../../shared/models/Subject";

@Component({
  selector: "app-subject-home",
  templateUrl: "./subject-home.page.html",
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
  styleUrls: ["./subject-home.page.scss"],
})
export class SubjectHomePage implements OnInit {
  searchString: string = "scsj";
  subjectList: Array<Subject>;
  filteredSubjectList: Array<Subject>;
  // collapse: Array<Boolean> = [];
  constructor(
    private ss: SubjectServiceService,
    private ge: GlobalEventService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    console.log("subject init");
    this.subjectList = await this.ss.getSubjects();
    this.filteredSubjectList = this.subjectList;
  }

  get isDataLoaded() {
    return this.subjectList;
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

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
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

  // expandCard(i) {
  //   let c = this.collapse[i];
  //   this.collapse = this.collapse.map((r) => false);
  //   this.collapse[i] = !c;
  // }
}

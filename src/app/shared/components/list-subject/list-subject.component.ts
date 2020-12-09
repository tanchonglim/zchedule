import { Component, Input, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from "@angular/animations";
import { ModalController } from "@ionic/angular";

export interface RegisteredSubjectListData {
  nama_subjek: string;
  kod_subjek: string;
  sesi: string;
  semester: number;
  bil_pelajar?: number;
  seksyen: number;
}

interface sesiSem {
  sesi: string;
  semester: number;
  subjects: Array<{
    nama_subjek: string;
    kod_subjek: string;
    bil_pelajar?: number;
    seksyen: number;
  }>;
}

@Component({
  selector: "app-list-subject",
  templateUrl: "./list-subject.component.html",
  animations: [
    trigger("collapse", [
      state("true", style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state("false", style({ height: "0", visibility: "hidden" })),
      transition("false => true", animate(300 + "ms ease-out")),
      transition("true => false", animate(300 + "ms ease-in")),
    ]),
    trigger("rotatedState", [
      state("true", style({ transform: "rotate(-90deg)" })),
      state("false", style({ transform: "rotate(90deg)" })),
      transition("false => true", animate("300ms ease-out")),
      transition("true => false", animate("300ms ease-in")),
    ]),
  ],
  styleUrls: ["./list-subject.component.scss"],
})
export class ListSubjectComponent implements OnInit {
  @Input() registeredSubjectListData: Array<RegisteredSubjectListData>;

  sesiSemData: Array<sesiSem> = [];
  collapse: Array<Boolean> = [];

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.collapse = this.registeredSubjectListData.map((r) => false);
    this.collapse[0] = true;
    this.registeredSubjectListData.forEach((subject) => {
      let sesiSem = this.sesiSemData.find(
        (d) => d.sesi == subject.sesi && d.semester == subject.semester
      );

      if (sesiSem) {
        sesiSem.subjects.push({
          nama_subjek: subject.nama_subjek,
          kod_subjek: subject.kod_subjek,
          bil_pelajar: subject.bil_pelajar,
          seksyen: subject.seksyen,
        });
      } else {
        this.sesiSemData.push({
          sesi: subject.sesi,
          semester: subject.semester,
          subjects: [
            {
              nama_subjek: subject.nama_subjek,
              kod_subjek: subject.kod_subjek,
              bil_pelajar: subject.bil_pelajar,
              seksyen: subject.seksyen,
            },
          ],
        });
      }
    });
    console.log(this.sesiSemData);
  }

  expandCard(i) {
    let c = this.collapse[i];
    this.collapse = this.collapse.map((r) => false);
    this.collapse[i] = !c;
  }
}

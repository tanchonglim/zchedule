import { Component, Input, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from "@angular/animations";

export interface RegisteredSubjectListData {
  nama_subjek: string;
  kod_subjek: string;
  sesi: string;
  semester: number;
  bil_pelajar?: number;
}

interface sesiSem {
  sesi: string;
  semester: number;
  subjects: Array<{
    nama_subjek: string;
    kod_subjek: string;
    bil_pelajar?: number;
  }>;
}

@Component({
  selector: "app-subject-list",
  templateUrl: "./subject-list.component.html",
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
  styleUrls: ["./subject-list.component.scss"],
})
export class SubjectListComponent implements OnInit {
  @Input() registeredSubjectListData: Array<RegisteredSubjectListData>;

  sesiSemData: Array<sesiSem> = [];
  collapse: Array<Boolean> = [];

  constructor() {}

  ngOnInit() {
    console.log(this.registeredSubjectListData);
    this.collapse = this.registeredSubjectListData.map((r) => false);
    this.registeredSubjectListData.forEach((subject) => {
      let sesiSem = this.sesiSemData.find(
        (d) => d.sesi == subject.sesi && d.semester == subject.semester
      );

      if (sesiSem) {
        sesiSem.subjects.push({
          nama_subjek: subject.nama_subjek,
          kod_subjek: subject.kod_subjek,
          bil_pelajar: subject.bil_pelajar,
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

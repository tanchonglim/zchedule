import { Component, Input, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
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
    trigger("expandCard", [
      transition(":enter", [
        style({
          opacity: 0,
          marginTop: "-10%",
        }),
        animate(
          "300ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({
            marginTop: "0px",
            opacity: "1",
          })
        ),
      ]),
      transition(":leave", [
        style({
          opacity: 1,
          marginTop: "0px",
        }),
        animate(
          "300ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({
            marginTop: "-10%",
            opacity: "0",
          })
        ),
      ]),
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

import { Component, OnInit } from "@angular/core";
import { Subject } from "./../../../shared/models/Subject";
import { SubjectServiceService } from "./../../subject-service.service";
import { ModalController } from "@ionic/angular";
import { ChartSelectEvent } from "ng2-google-charts";
import { SubjectChartBarDetailComponent } from "../subject-chart-bar-detail/subject-chart-bar-detail.component";

@Component({
  selector: "app-subject-chart",
  templateUrl: "./subject-chart.component.html",
  styleUrls: ["./subject-chart.component.scss"],
})
export class SubjectChartComponent implements OnInit {
  subjectList: Array<Subject>;
  barChartData: any;
  bar_num: number;
  bar: Array<{
    start: number;
    end: number;
    sub_num: number;
    subjects: Array<Subject>;
  }> = [];

  constructor(
    private ss: SubjectServiceService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    setTimeout(async () => {
      await this.getLecturerList();
      this.getBarNum();
      this.insertBarData();
      this.drawChart();
    }, 120);
  }

  async getLecturerList() {
    this.subjectList = await this.ss.getSubjects();
    // this.bar_num = Math.ceil(this.lecturerList.length / 10);
  }

  getBarNum() {
    let max_stud = this.subjectList[0].bil_pelajar;
    this.subjectList.forEach((sub) => {
      if (sub.bil_pelajar > max_stud) max_stud = sub.bil_pelajar;
    });
    max_stud = Math.round(max_stud / 10) * 10;
    this.bar_num = max_stud / 10;
  }

  insertBarData() {
    for (let i = 0; i < 10; i++) {
      this.bar.push({
        start: i * this.bar_num,
        end: (i + 1) * this.bar_num - 1,
        sub_num: 0,
        subjects: [],
      });
    }

    this.subjectList.forEach((lect) => {
      this.bar.forEach((b) => {
        if (lect.bil_pelajar >= b.start && lect.bil_pelajar <= b.end) {
          b.sub_num += 1;
          b.subjects.push(lect);
        }
      });
    });
  }

  drawChart() {
    this.barChartData = {
      chartType: "BarChart",
      dataTable: [["Students", "#"]],
      options: {
        title: "Number of students against Number of subjects",
        width: 400,
        height: 500,
      },
    };

    this.bar.forEach((b) => {
      this.barChartData.dataTable.push([b.start + "-" + b.end, b.sub_num]);
    });
  }

  async select(event: ChartSelectEvent) {
    if (event.row == null) return;
    let index = event.row;

    let subjects = this.bar[index].subjects;

    const modal = await this.modalCtrl.create({
      component: SubjectChartBarDetailComponent,
      componentProps: {
        subjects: subjects,
        range: event.selectedRowFormattedValues[0],
      },
      cssClass: "modal-float-bottom",
    });
    await modal.present();
  }
}

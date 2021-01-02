import { Component, OnInit } from "@angular/core";
import { Lecturer } from "./../../../shared/models/Lecturer";
import { LecturerServiceService } from "./../../lecturer-service.service";

@Component({
  selector: "app-lecturer-chart",
  templateUrl: "./lecturer-chart.component.html",
  styleUrls: ["./lecturer-chart.component.scss"],
})
export class LecturerChartComponent implements OnInit {
  lecturerList: Array<Lecturer>;
  barChartData: any;
  bar_num: number;
  bar: Array<{
    start: number;
    end: number;
    lect_num: number;
  }> = [];

  isDrawn: boolean;

  constructor(private ls: LecturerServiceService) {}

  ngOnInit() {
    setTimeout(async () => {
      await this.getLecturerList();
      this.getBarNum();
      this.insertBarData();
      this.drawChart();
      this.isDrawn = true;
    }, 120);
  }

  async getLecturerList() {
    this.lecturerList = await this.ls.getLecturerList();
    // this.bar_num = Math.ceil(this.lecturerList.length / 10);
  }

  getBarNum() {
    let max_stud = this.lecturerList[0].bil_pelajar;
    this.lecturerList.forEach((lect) => {
      if (lect.bil_pelajar > max_stud) max_stud = lect.bil_pelajar;
    });
    console.log(max_stud);
    max_stud = Math.round(max_stud / 10) * 10;
    this.bar_num = max_stud / 10;
  }

  insertBarData() {
    for (let i = 0; i < 10; i++) {
      this.bar.push({
        start: i * this.bar_num,
        end: (i + 1) * this.bar_num - 1,
        lect_num: 0,
      });
    }

    console.log(this.bar);
    this.lecturerList.forEach((lect) => {
      this.bar.forEach((b) => {
        if (lect.bil_pelajar >= b.start && lect.bil_pelajar <= b.end) {
          b.lect_num += 1;
        }
      });
    });
  }

  drawChart() {
    this.barChartData = {
      chartType: "B",
      dataTable: [["Students", "Number"]],
      options: {
        title: "Number of lecturers against Number of students",
        width: 400,
        height: 1000,
      },
    };

    // this.bar.forEach((b) => {
    //   this.barChartData.dataTable.push(b.start + "-" + b.end, b.lect_num);
    // });
    this.bar.forEach((b) => {
      this.barChartData.dataTable.push(34, "434");
    });
  }
}

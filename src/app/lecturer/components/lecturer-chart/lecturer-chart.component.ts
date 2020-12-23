import { Component, Input, OnInit } from "@angular/core";
import { Lecturer } from "./../../../shared/models/Lecturer";
import { LecturerServiceService } from "./../../lecturer-service.service";

@Component({
  selector: "app-lecturer-chart",
  templateUrl: "./lecturer-chart.component.html",
  styleUrls: ["./lecturer-chart.component.scss"],
})
export class LecturerChartComponent implements OnInit {
  lecturerList: Array<Lecturer>;
  pieChartData: any;
  bar_num: number;

  constructor(private ls: LecturerServiceService) {}

  ngOnInit() {
    setTimeout(async () => {
      this.getLecturerList();
      this.drawChart();
    }, 120);
  }

  async getLecturerList() {
    this.lecturerList = await this.ls.getLecturerList();
    this.lecturerList.forEach((l) => console.log(l.nama));
    console.log(this.lecturerList.length);
    this.bar_num = Math.ceil(this.lecturerList.length / 10);
    console.log(this.bar_num);
  }

  drawChart() {
    this.pieChartData = {
      chartType: "BarChart",
      dataTable: [
        ["Languages", "Percent"],
        ["JavaScript", 33],
      ],
      options: {
        title: "Technologies",
        width: 400,
        height: 300,
      },
    };
    // let data = ["a", 10];
    for (let i = 0; i < this.bar_num; i++)
      this.pieChartData.dataTable.push(["a", 10]);
  }
}

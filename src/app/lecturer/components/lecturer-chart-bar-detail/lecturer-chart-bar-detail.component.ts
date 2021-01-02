import { Component, OnInit } from "@angular/core";
import { Lecturer } from "./../../../shared/models/Lecturer";
import { Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-lecturer-chart-bar-detail",
  templateUrl: "./lecturer-chart-bar-detail.component.html",
  styleUrls: ["./lecturer-chart-bar-detail.component.scss"],
})
export class LecturerChartBarDetailComponent implements OnInit {
  @Input() lecturers: Array<Lecturer>;
  @Input() range: string;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

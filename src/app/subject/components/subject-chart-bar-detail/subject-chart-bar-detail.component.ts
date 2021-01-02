import { Component, OnInit } from "@angular/core";
import { Subject } from "./../../../shared/models/Subject";
import { Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-subject-chart-bar-detail",
  templateUrl: "./subject-chart-bar-detail.component.html",
  styleUrls: ["./subject-chart-bar-detail.component.scss"],
})
export class SubjectChartBarDetailComponent implements OnInit {
  @Input() subjects: Array<Subject>;
  @Input() range: string;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

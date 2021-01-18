import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-timetable-detail",
  templateUrl: "./timetable-detail.component.html",
  styleUrls: ["./timetable-detail.component.scss"],
})
export class TimetableDetailComponent implements OnInit {
  @Input() data: string;
  @Input() title: string;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}

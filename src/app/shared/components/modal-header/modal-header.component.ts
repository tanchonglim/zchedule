import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrls: ["./modal-header.component.scss"],
})
export class ModalHeaderComponent implements OnInit {
  constructor(public modal: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }
}

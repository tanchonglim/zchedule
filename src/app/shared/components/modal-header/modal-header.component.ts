import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";

/**
 * pass empty array of tabs if no tabs
 */
export interface ModalHeaderProps {
  title: string;
  subtitle: string;
  tabs: Array<string>;
}

@Component({
  selector: "app-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrls: ["./modal-header.component.scss"],
})
export class ModalHeaderComponent implements OnInit {
  @Input() properties: ModalHeaderProps;

  @Input() selectedTab: number;
  @Output() selectedTabChange = new EventEmitter();

  constructor(public modal: ModalController) {}

  ngOnInit() {}

  changeTab(number) {
    this.selectedTab = number;
    this.selectedTabChange.emit(number);
  }

  dismiss() {
    this.modal.dismiss();
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { ModalHeaderProps } from "src/app/shared/components/modal-header/modal-header.component";
import { Lecturer } from "./../../../shared/models/Lecturer";

@Component({
  selector: "app-lecturer-detail",
  templateUrl: "./lecturer-detail.component.html",
  styleUrls: ["./lecturer-detail.component.scss"],
})
export class LecturerDetailComponent implements OnInit {
  @Input() lecturer: Lecturer;
  headerModalProps: ModalHeaderProps;
  selectedTab: number = 0;

  constructor() {}

  ngOnInit() {
    this.headerModalProps = {
      title: this.lecturer.nama,
      subtitle: this.lecturer.no_pekerja.toString(),
      tabs: ["Info", "Schedule"],
    };
  }
}

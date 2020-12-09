import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { AppHeaderProps } from "src/app/shared/components/modal-header/modal-header.component";
import { Student } from "src/app/shared/models/Student";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.scss"],
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  headerModalProps: AppHeaderProps;
  selectedTab: number = 0;

  constructor() {}

  ngOnInit() {
    this.headerModalProps = {
      title: this.student.nama,
      subtitle: this.student.no_matrik.toString(),
      tabs: ["Schedules", "Subjects"],
    };
    console.log(this.student);
  }
}
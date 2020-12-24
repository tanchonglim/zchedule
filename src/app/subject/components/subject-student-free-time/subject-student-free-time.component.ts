import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-subject-student-free-time",
  templateUrl: "./subject-student-free-time.component.html",
  styleUrls: ["./subject-student-free-time.component.scss"],
})
export class SubjectStudentFreeTimeComponent implements OnInit {
  @Input() subjectStudents;
  constructor() {}

  ngOnInit() {
    console.log(this.subjectStudents);
  }
}

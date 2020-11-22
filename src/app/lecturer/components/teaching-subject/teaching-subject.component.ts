import { Component, Input, OnInit } from "@angular/core";
import { LecturerServiceService } from "../../lecturer-service.service";
import { LecturerSubject } from "./../../../shared/models/LecturerSubject";

@Component({
  selector: "app-teaching-subject",
  templateUrl: "./teaching-subject.component.html",
  styleUrls: ["./teaching-subject.component.scss"],
})
export class TeachingSubjectComponent implements OnInit {
  @Input() id: string;
  lecturerSubject: Array<LecturerSubject>;
  constructor(private ls: LecturerServiceService) {}

  async ngOnInit() {
    this.lecturerSubject = await this.ls.getLecturerSubject(this.id);
    console.log(this.lecturerSubject[0].bil_pelajar);
    console.log(this.lecturerSubject[0].kod_subjek);
    console.log(this.lecturerSubject);
  }
}

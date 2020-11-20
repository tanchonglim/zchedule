import { Component, Input, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/core/service/data-service.service";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { StudentServiceService } from "../../student-service.service";

@Component({
  selector: "app-registered-subjects",
  templateUrl: "./registered-subjects.component.html",
  styleUrls: ["./registered-subjects.component.scss"],
})
export class RegisteredSubjectsComponent implements OnInit {
  @Input() id: string;
  studentSubject: Array<StudentSubject>;
  constructor(private ss: StudentServiceService) {}

  async ngOnInit() {
    this.studentSubject = await this.ss.getStudentSubjects(this.id);
    console.log(this.studentSubject);

    // this.dataService.getStudentSubjects('1').then(result =>{
    //   this.studentSubject= result
    // })
  }
}

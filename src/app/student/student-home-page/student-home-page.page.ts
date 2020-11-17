import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/core/service/data-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { StudentServiceService } from "../student-service.service";
import { TimetableData } from "./../../shared/models/TimetableData";

@Component({
  selector: "app-student-home-page",
  templateUrl: "./student-home-page.page.html",
  styleUrls: ["./student-home-page.page.scss"],
})
export class StudentHomePagePage implements OnInit {
  currentSesiSem: SesiSemester;
  timetableData: TimetableData;

  constructor(
    private studentService: StudentServiceService,
    private ds: DataServiceService
  ) {}

  async ngOnInit() {
    this.generateTimetable();
    this.currentSesiSem = (await this.ds.getSesiSemester())[0];

    this.timetableData = await this.studentService.getTimetable(
      this.ds.getID(),
      this.currentSesiSem.sesi,
      this.currentSesiSem.semester
    );

    this.appendTimetableData();
  }

  timetableBody: {
    slots: Array<{
      day: number;
      timeSlot: number;
      data: string;
    }>;
  };
  generateTimetable() {
    this.timetableBody = {
      slots: [],
    };
    let counter = 0;

    for (let time = 2; time <= 10; time++) {
      for (let day = 1; day <= 5; day++) {
        this.timetableBody.slots.push({
          day: day,
          timeSlot: time,
          data: "-",
        });
        counter++;
      }
    }
    console.log(counter);
  }

  appendTimetableData() {
    this.timetableData.slots.forEach((slot) => {
      let index = this.timetableBody.slots.findIndex((s) => {
        return s.timeSlot === slot.timeSlot && s.day === slot.day;
      });
      if (index !== -1) {
        this.timetableBody.slots[index].data = slot.data;
      }
    });
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { TimetableData } from "../../models/TimetableData";

@Component({
  selector: "app-timetable-subjects",
  templateUrl: "./timetable-subjects.component.html",
  styleUrls: ["./timetable-subjects.component.scss"],
})
export class TimetableSubjectsComponent implements OnInit {
  @Input() timetableData: TimetableData;
  timetableBody: {
    slots: Array<{
      day: number;
      timeSlot: number;
      data: string;
    }>;
  };

  constructor() {}

  ngOnInit() {
    this.generateTimetable();
    this.appendTimetableData();
  }

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

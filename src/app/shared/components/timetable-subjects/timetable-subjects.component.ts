import { Component, Input, OnInit } from "@angular/core";

export interface TimetableData {
  slots: Array<{
    day: number;
    timeSlot: number;
    data: string;
  }>;
}

@Component({
  selector: "app-timetable-subjects",
  templateUrl: "./timetable-subjects.component.html",
  styleUrls: ["./timetable-subjects.component.scss"],
})
export class TimetableSubjectsComponent implements OnInit {
  @Input() timetableData: TimetableData;

  days = [" ", "SUN", "MON", "TUE", "WED", "THU"];
  times = [
    "8.00-8.50",
    "9.00-9.50",
    "10.00-10.50",
    "11.00-11.50",
    "12.00-12.50",
    "1.00-1.50",
    "2.00-2.50",
    "3.00-3.50",
    "4.00-4.50",
    "5.00-5.50",
  ];
  timetableBody: {
    slots: Array<{
      day: number;
      timeSlot: number;
      data: string;
    }>;
  };

  // timetableBody2: {
  //   days: Array<{
  //     timeSlot: Array<{
  //       start: number;
  //       slotTaken: number; //total need
  //       data: number;
  //     }>;
  //   }>;
  // };

  constructor() {}

  ngOnInit() {
    this.generateTimetable();
    this.appendTimetableData();
  }

  generateTimetable() {
    this.timetableBody = {
      slots: [],
    };

    for (let time = 2; time <= 11; time++) {
      for (let day = 1; day <= 5; day++) {
        this.timetableBody.slots.push({
          day: day,
          timeSlot: time,
          data: " ",
        });
      }
    }
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

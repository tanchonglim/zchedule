import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { TimetableDetailComponent } from "./timetable-detail/timetable-detail.component";

export interface TimetableData {
  slots: Array<{
    day: number;
    timeSlot: number;
    data: {
      data: string;
      type: number;
      detail: string;
    };
  }>;
}

@Component({
  selector: "app-timetable-subjects",
  templateUrl: "./timetable-subjects.component.html",
  styleUrls: ["./timetable-subjects.component.scss"],
})
export class TimetableSubjectsComponent implements OnInit {
  @Input() timetableData: TimetableData;
  @Input() expanded: boolean;

  days: Array<string>;
  times: Array<string>;
  timetableBody: {
    slots: Array<{
      day: number;
      timeSlot: number;
      span: number;
      data: {
        data: string;
        type: number;
        detail: string;
      };
    }>;
  };

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.generateTimetable();
    this.appendTimetableData();
  }

  generateTimetable() {
    this.days = [" ", "SUN", "MON", "TUE", "WED", "THU"];
    this.times = [
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
    this.timetableBody = {
      slots: [],
    };

    let numDays = 5;
    let numTimes = 11;
    if (this.expanded) {
      this.days = [...this.days, "FRI", "SAT"];
      this.times = [
        "7.00-7.50",
        ...this.times,
        "6.00-6.50",
        "7.00-7.50",
        "8.00-8.50",
      ];
      numDays = 7;
      numTimes = 15;
    }

    for (let day = 1; day <= numDays; day++) {
      for (let time = 2; time <= numTimes; time++) {
        this.timetableBody.slots.push({
          day: day,
          timeSlot: time,
          span: 1,
          data: {
            data: " ",
            type: 0,
            detail: " ",
          },
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
    let reversedArr = this.timetableBody.slots.reverse();

    reversedArr.forEach((slot, i, slots) => {
      if (i == 0) slot.span = 1;
      if (i == slots.length - 1) return;
      if (
        slot.data &&
        slot.data.data !== " " &&
        slot.data.data == slots[i + 1].data.data
      ) {
        slots[i + 1].span += slot.span;
        slot.span = 0;
      }
    });

    this.timetableBody.slots = reversedArr.reverse();
  }

  async viewDetail(title, data) {
    if (title === " ") return;
    if (!data) return;
    const modal = await this.modalController.create({
      component: TimetableDetailComponent,
      componentProps: {
        title: title,
        data: data,
      },
      cssClass: "modal-float-bottom",
    });
    await modal.present();
    await modal.onWillDismiss();
  }
}

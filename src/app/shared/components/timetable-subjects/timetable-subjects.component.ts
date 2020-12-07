import { Component, Input, OnInit } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { random } from "lodash";
import { TimetableDetailComponent } from "./timetable-detail/timetable-detail.component";
import { TooltipsModule } from "ionic-tooltips";

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
    console.log(this.timetableBody);
  }

  generateTimetable() {
    this.timetableBody = {
      slots: [],
    };

    for (let day = 1; day <= 5; day++) {
      for (let time = 2; time <= 11; time++) {
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
      if (slot.data.data !== " " && slot.data.data == slots[i + 1].data.data) {
        slots[i + 1].span += slot.span;
        slot.span = 0;
      }
    });
    this.timetableBody.slots = reversedArr.reverse();
    console.log(this.timetableBody);
  }

  async viewDetail(title, data) {
    if (title === " ") return;
    const modal = await this.modalController.create({
      component: TimetableDetailComponent,
      componentProps: {
        title: title,
        data: data,
      },
      cssClass: "timetable-data-detail",
    });
    await modal.present();
    await modal.onWillDismiss();
  }
}

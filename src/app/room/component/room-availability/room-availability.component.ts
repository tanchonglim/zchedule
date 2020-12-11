import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from "@angular/animations";
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult,
} from "ion2-calendar";
import { RoomServiceService } from "./../../room-service.service";
import { Room } from "./../../../shared/models/Room";
import { ScheduleRoom } from "./../../../shared/models/ScheduleRoom";

@Component({
  selector: "app-room-availability",
  templateUrl: "./room-availability.component.html",
  animations: [
    trigger("collapse", [
      state("true", style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state("false", style({ height: "0", visibility: "hidden" })),
      transition("false => true", animate(300 + "ms ease-out")),
      transition("true => false", animate(300 + "ms ease-in")),
    ]),
    trigger("rotatedState", [
      state("true", style({ transform: "rotate(-90deg)" })),
      state("false", style({ transform: "rotate(90deg)" })),
      transition("false => true", animate("300ms ease-out")),
      transition("true => false", animate("300ms ease-in")),
    ]),
  ],
  styleUrls: ["./room-availability.component.scss"],
})
export class RoomAvailabilityComponent implements OnInit {
  dateRange: {
    from: CalendarResult;
    to: CalendarResult;
  };
  selectedRadioDay: any;
  selectedRadioTimeslot: Array<number> = [];
  collapse1: boolean = false;
  collapse2: boolean = false;

  availableRoomList: Array<Room> = [];
  collapse: Array<Boolean> = [];

  flag: boolean = true;
  timeslot: Array<{
    time: number;
    value: string;
  }> = [];

  tempTimeslot: Array<{
    time: number;
    value: string;
  }> = [];

  public time = [
    { val: "07:00 AM - 07:50 AM", isChecked: true },
    { val: "08:00 AM - 08:50 AM", isChecked: true },
    { val: "09:00 AM - 09:50 AM", isChecked: true },
    { val: "10:00 AM - 10:50 AM", isChecked: true },
    { val: "11:00 AM - 11:50 AM", isChecked: true },
    { val: "12:00 PM - 12:50 PM", isChecked: true },
    { val: "01:00 PM - 01:50 PM", isChecked: true },
    { val: "02:00 PM - 02:50 PM", isChecked: true },
    { val: "03:00 PM - 03:50 PM", isChecked: false },
    { val: "04:00 PM - 04:50 PM", isChecked: false },
    { val: "05:00 PM - 05:50 PM", isChecked: false },
    { val: "06:00 PM - 06:50 PM", isChecked: false },
    { val: "07:00 PM - 07:50 PM", isChecked: false },
    { val: "08:00 PM - 08:50 PM", isChecked: false },
    { val: "09:00 PM - 09:50 PM", isChecked: false },
    { val: "10:00 PM - 10:50 PM", isChecked: false },
  ];

  constructor(
    public modalCtrl: ModalController,
    private rs: RoomServiceService
  ) {}

  ngOnInit() {}

  async openCalendar() {
    const options: CalendarModalOptions = {
      title: "",
      pickMode: "range",
      to: new Date((await this.rs.getCurrentSesiSem()).tarikh_tamat),
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options },
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    if (event.data) {
      this.dateRange = event.data;
    }
  }

  expandCard1() {
    let c = this.collapse1;
    this.collapse2 = false;
    this.collapse1 = !c;
  }

  expandCard2() {
    let c = this.collapse2;
    this.collapse1 = false;
    this.collapse2 = !c;
  }

  radioGroupChangeDay(event) {
    console.log(event.detail);
    this.selectedRadioDay = event.detail.value;
  }

  radioGroupChangeTimeslot(event) {
    this.tempTimeslot = [];
    this.time.forEach((t, index) => {
      if (t.isChecked) {
        this.tempTimeslot.push({
          time: index + 1,
          value: this.time[index].val,
        });
      }
    });
  }

  expandCard(i) {
    let c = this.collapse[i];
    this.collapse = this.collapse.map((r) => false);
    this.collapse[i] = !c;
  }

  async getAvailableRoom() {
    this.availableRoomList = [];
    this.time.forEach((t, index) => {
      if (t.isChecked) {
        this.timeslot.push({ time: index + 1, value: this.time[index].val });
      }
    });

    let roomList = await this.rs.getRoomList();
    for (let room of roomList) {
      let schedules: Array<ScheduleRoom> = await this.rs.getRoomSchedule(
        room.kod_ruang
      );
      if (!schedules.length) {
        this.availableRoomList.push(room);
      } else {
        let isClash = schedules.find((schedule) => {
          if (
            schedule.hari == this.selectedRadioDay &&
            this.timeslot.find((ts) => ts.time == schedule.masa)
          )
            return true;
        });

        if (!isClash) {
          this.availableRoomList.push(room);
        }
      }
    }
    console.log(this.availableRoomList);
  }
}

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
import { RoomDetailComponent } from "./../room-detail/room-detail.component";

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
  isSearching: boolean = false;

  sdateRangeFrom: string; //s for selected
  sdateRangeTo: string; //s for selected

  selectedDay: {
    val: string;
    day: number;
  };

  availableRoomList: Array<Room> = null;
  collapse: Array<Boolean> = [false, false];

  public timeslot = [
    { val: "07:00 AM - 07:50 AM", isChecked: false, slot: 1 },
    { val: "08:00 AM - 08:50 AM", isChecked: false, slot: 2 },
    { val: "09:00 AM - 09:50 AM", isChecked: false, slot: 3 },
    { val: "10:00 AM - 10:50 AM", isChecked: false, slot: 4 },
    { val: "11:00 AM - 11:50 AM", isChecked: false, slot: 5 },
    { val: "12:00 PM - 12:50 PM", isChecked: false, slot: 6 },
    { val: "01:00 PM - 01:50 PM", isChecked: false, slot: 7 },
    { val: "02:00 PM - 02:50 PM", isChecked: false, slot: 8 },
    { val: "03:00 PM - 03:50 PM", isChecked: false, slot: 9 },
    { val: "04:00 PM - 04:50 PM", isChecked: false, slot: 10 },
    { val: "05:00 PM - 05:50 PM", isChecked: false, slot: 11 },
    { val: "06:00 PM - 06:50 PM", isChecked: false, slot: 12 },
    { val: "07:00 PM - 07:50 PM", isChecked: false, slot: 13 },
    { val: "08:00 PM - 08:50 PM", isChecked: false, slot: 14 },
    { val: "09:00 PM - 09:50 PM", isChecked: false, slot: 15 },
    { val: "10:00 PM - 10:50 PM", isChecked: false, slot: 16 },
  ];

  public days = [
    { val: "Sunday", day: 1 },
    { val: "Monday", day: 2 },
    { val: "Tuesday", day: 3 },
    { val: "Wednesday", day: 4 },
    { val: "Thursday", day: 5 },
    { val: "Friday", day: 6 },
    { val: "Saturday", day: 7 },
  ];

  constructor(
    public modalCtrl: ModalController,
    private rs: RoomServiceService
  ) {}

  async ngOnInit() {
    this.sdateRangeFrom = (await this.rs.getCurrentSesiSem()).tarikh_mula;
    this.sdateRangeTo = (await this.rs.getCurrentSesiSem()).tarikh_tamat;
  }

  async openCalendar() {
    const options: CalendarModalOptions = {
      title: "",
      pickMode: "range",
      from: new Date((await this.rs.getCurrentSesiSem()).tarikh_mula),
      to: new Date((await this.rs.getCurrentSesiSem()).tarikh_tamat),
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options },
    });

    await myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    if (event.data) {
      let dateRange = event.data;
      this.sdateRangeFrom = dateRange.from.string;
      this.sdateRangeTo = dateRange.to.string;
    }
  }

  expand(i) {
    let c = this.collapse[i];
    this.collapse.fill(false);
    this.collapse[i] = !c;
  }

  radioGroupChangeDay(event) {
    this.selectedDay = event.detail.value;
  }

  get selectedSlots() {
    return this.timeslot
      .filter((s) => s.isChecked)
      .map((s) => s.slot)
      .toString();
  }

  async getAvailableRoom() {
    //validation
    if (!this.sdateRangeFrom || !this.sdateRangeTo) {
      alert("Please select a date range");
      return;
    }
    if (!this.selectedDay) {
      alert("Please select a day");
      return;
    }
    if (!this.timeslot.find((s) => s.isChecked)) {
      alert("Please select at least one timeslot");
      return;
    }

    this.collapse.fill(false);
    this.isSearching = true;
    this.availableRoomList = await this.rs.getAvailableRoom(
      this.timeslot,
      this.selectedDay.day,
      this.sdateRangeFrom,
      this.sdateRangeTo
    );
    this.isSearching = false;
  }

  async openRoomDetail(room) {
    const modal = await this.modalCtrl.create({
      component: RoomDetailComponent,
      componentProps: {
        room: room,
      },
    });
    await modal.present();
  }
}

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
  dateRange: {
    from: CalendarResult;
    to: CalendarResult;
  };
  sdateRangeFrom: string; //s for selected
  sdateRangeTo: string; //s for selected

  selectedRadioDay: any;
  selectedDayString: string = "Select a day";

  collapse1: boolean = false;
  collapse2: boolean = false;

  availableRoomList: Array<Room> = null;
  collapse: Array<Boolean> = [];

  // timeslot: Array<{
  //   time: number;
  //   value: string;
  // }> = [];

  public timeslot = [
    { val: "07:00 AM - 07:50 AM", isChecked: true, slot: 1 },
    { val: "08:00 AM - 08:50 AM", isChecked: true, slot: 2 },
    { val: "09:00 AM - 09:50 AM", isChecked: true, slot: 3 },
    { val: "10:00 AM - 10:50 AM", isChecked: true, slot: 4 },
    { val: "11:00 AM - 11:50 AM", isChecked: true, slot: 5 },
    { val: "12:00 PM - 12:50 PM", isChecked: true, slot: 6 },
    { val: "01:00 PM - 01:50 PM", isChecked: true, slot: 7 },
    { val: "02:00 PM - 02:50 PM", isChecked: true, slot: 8 },
    { val: "03:00 PM - 03:50 PM", isChecked: false, slot: 9 },
    { val: "04:00 PM - 04:50 PM", isChecked: false, slot: 10 },
    { val: "05:00 PM - 05:50 PM", isChecked: false, slot: 11 },
    { val: "06:00 PM - 06:50 PM", isChecked: false, slot: 12 },
    { val: "07:00 PM - 07:50 PM", isChecked: false, slot: 13 },
    { val: "08:00 PM - 08:50 PM", isChecked: false, slot: 14 },
    { val: "09:00 PM - 09:50 PM", isChecked: false, slot: 15 },
    { val: "10:00 PM - 10:50 PM", isChecked: false, slot: 16 },
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

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    if (event.data) {
      this.dateRange = event.data;
      this.getDateRange();
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

    switch (this.selectedRadioDay) {
      case "1":
        this.selectedDayString = "Sunday";
        break;
      case "2":
        this.selectedDayString = "Monday";
        break;
      case "3":
        this.selectedDayString = "Tuesday";
        break;
      case "4":
        this.selectedDayString = "Wednesday";
        break;
      case "5":
        this.selectedDayString = "Thursday";
        break;
      case "6":
        this.selectedDayString = "Friday";
        break;
      case "7":
        this.selectedDayString = "Saturday";
        break;
      default:
        this.selectedDayString = "Select a day";
        break;
    }
  }

  expandCard(i) {
    let c = this.collapse[i];
    this.collapse = this.collapse.map((r) => false);
    this.collapse[i] = !c;
  }

  async getDateRange() {
    this.sdateRangeFrom = this.dateRange.from.string;
    this.sdateRangeTo = this.dateRange.to.string;
  }

  async getAvailableRoom() {
    this.availableRoomList = await this.rs.getAvailableRoom(
      this.timeslot,
      this.selectedRadioDay,
      this.sdateRangeFrom,
      this.sdateRangeTo
    );
    console.log(this.availableRoomList);
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

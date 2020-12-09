import { Component, OnInit } from "@angular/core";
import { Room } from "src/app/shared/models/Room";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from "@angular/animations";
import { ModalController } from "@ionic/angular";
import { GlobalEventService } from "./../../core/service/global-event.service";
import { RoomServiceService } from "./../room-service.service";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-room-home",
  templateUrl: "./room-home.page.html",
  animations: [
    trigger("collapse", [
      state("true", style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state("false", style({ height: "0", visibility: "hidden" })),
      transition("false => true", animate(100 + "ms ease-out")),
      transition("true => false", animate(100 + "ms ease-in")),
    ]),
    trigger("rotatedState", [
      state("true", style({ transform: "rotate(-90deg)" })),
      state("false", style({ transform: "rotate(90deg)" })),
      transition("false => true", animate("100ms ease-out")),
      transition("true => false", animate("100ms ease-in")),
    ]),
  ],
  styleUrls: ["./room-home.page.scss"],
})
export class RoomHomePage implements OnInit {
  searchString: string = "B11BK2";
  filteredRoomList: Array<Room>;
  roomList: Array<Room>;
  collapse: Array<Boolean> = [];

  pageHeaderProps: PageHeaderProps = {
    title: "Room",
    tabs: ["List", "Availability"],
  };
  selectedTab: number = 0;

  constructor(
    public modal: ModalController,
    private rs: RoomServiceService,
    private ge: GlobalEventService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.roomList = await this.rs.getRoomList();
    this.filteredRoomList = this.roomList;
    console.log("room init");
  }

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }

  onsearch(event) {
    let searchString = event.target.value;
    this.filteredRoomList = this.roomList.filter((room) => {
      return (
        room.kod_ruang
          .toLowerCase()
          .trim()
          .includes(searchString.trim().toLowerCase()) ||
        room.nama_ruang_singkatan
          .toLowerCase()
          .trim()
          .includes(searchString.trim().toLowerCase())
      );
    });
  }

  clearsearch() {
    this.filteredRoomList = this.roomList;
  }

  async openRoomDetail(room) {}
}

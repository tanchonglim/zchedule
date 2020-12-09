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

@Component({
  selector: "app-room-home",
  templateUrl: "./room-home.page.html",
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
  styleUrls: ["./room-home.page.scss"],
})
export class RoomHomePage implements OnInit {
  searchString: string = "B11BK2";
  filteredRoomList: Array<Room>;
  collapse: Array<Boolean> = [];

  constructor(
    public modal: ModalController,
    private rs: RoomServiceService,
    private ge: GlobalEventService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.filteredRoomList = null;
    console.log("room init");
  }

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }

  async searchRoom() {
    if (this.searchString) {
      let roomList = await this.rs.getFilteredRoomList(this.searchString);
      this.filteredRoomList = roomList;
      this.collapse = this.filteredRoomList.map((f) => false);
      console.log(roomList);
    } else {
      alert("Please input something");
    }
  }

  expandCard(i) {
    let c = this.collapse[i];
    this.collapse = this.collapse.map((r) => false);
    this.collapse[i] = !c;
  }
}

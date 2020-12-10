import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Room } from "src/app/shared/models/Room";
import { RoomServiceService } from "../../room-service.service";
import { RoomDetailComponent } from "./../room-detail/room-detail.component";

@Component({
  selector: "app-room-list",
  templateUrl: "./room-list.component.html",
  styleUrls: ["./room-list.component.scss"],
})
export class RoomListComponent implements OnInit {
  filteredRoomList: Array<Room>;
  roomList: Array<Room>;

  constructor(
    private rs: RoomServiceService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    this.getRoomList();
  }

  async getRoomList() {
    this.roomList = await this.rs.getRoomList();
    this.filteredRoomList = this.roomList;
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

  async openRoomDetail(room) {
    const modal = await this.modalController.create({
      component: RoomDetailComponent,
      componentProps: {
        room: room,
      },
    });
    await modal.present();
  }
}

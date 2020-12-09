import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { Room } from "./../shared/models/Room";

@Injectable({
  providedIn: "root",
})
export class RoomServiceService {
  constructor(private ds: DataServiceService) {}

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  async getFilteredRoomList(searchString: string) {
    let roomList: Array<Room> = [];
    let filteredRoomList: Array<Room> = [];

    roomList = await this.ds.getRoomList();
    filteredRoomList = roomList.filter((room) => {
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
    return filteredRoomList;
  }
}

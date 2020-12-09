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

  async getRoomList(): Promise<Array<Room>> {
    return await this.ds.getRoomList();
  }
}

import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { SesiSemester } from "../shared/models/SesiSemester";

@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  constructor(private ds: DataServiceService) {}

  async getCurrentuser() {
    return this.ds.getAuthUser();
  }

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  async getSesiSemList() {
    return this.ds.getSesiSemester();
  }

  setCurrentSesiSem(sesiSem: SesiSemester) {
    this.ds.setCurrentSesiSem(sesiSem);
  }
}

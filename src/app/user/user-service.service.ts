import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { SesiSemester } from "../shared/models/SesiSemester";
import { Auth } from "src/app/shared/models/Auth";
import { IonicColors } from "ionic-angular-theme-switch";

@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  constructor(private ds: DataServiceService) {}

  async login(login: string, password: string): Promise<Auth> {
    return await this.ds.login(login, password);
  }

  async logout() {
    this.ds.clearAllData();
  }

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

  getOfflineMode() {
    return this.ds.getOfflineMode();
  }
  async setOfflineMode(status) {
    await this.ds.setOfflineMode(status);
  }

  getCurrentTheme() {
    return this.ds.getCurrentTheme();
  }

  async setCurrentTheme(theme: IonicColors) {
    await this.ds.setCurrentTheme(theme);
  }
}

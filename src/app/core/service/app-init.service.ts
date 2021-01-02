import { Injectable } from "@angular/core";
import { DataServiceService } from "./data-service.service";

@Injectable({
  providedIn: "root",
})
export class AppInitService {
  constructor(private ds: DataServiceService) {}

  //this function run as the application startup
  async init() {
    await this.ds.init();
  }
}

import { Injectable } from "@angular/core";
import { DataServiceService } from "./data-service.service";

@Injectable({
  providedIn: "root",
})
export class AppInitService {
  constructor(private ds: DataServiceService) {}

  //this function run as the application startup
  async init() {
    this.ds.init();

    console.log("checking for saved credential");
    let credential = await this.ds.getCurrentUserCredential();
    if (credential) {
      console.log("found credential, auto login");
      return this.ds.login(credential.login, credential.password);
    } else {
      console.log("credential not found, should go to login page");
      return false;
    }
  }
}

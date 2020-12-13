import { Injectable } from "@angular/core";
import { DataServiceService } from "../service/data-service.service";
import { GMMStudentService } from "../service/gmmstudent.service";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(
    private dataService: DataServiceService,
    private gmmService: GMMStudentService
  ) {}

  async login(login: string, password: string): Promise<Boolean> {
    let user = await this.gmmService.authentication(login, password);
    //if is valid user
    if (user.session_id && user.admin_session_id) {
      this.dataService.setCurrentUser(login, password, user);
      return true;
      //if not valid user
    } else {
      return false;
    }
  }
}

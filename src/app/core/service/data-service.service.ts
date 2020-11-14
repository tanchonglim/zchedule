import { Injectable } from "@angular/core";
import { StudentSubject } from "src/app/shared/interface/StudentSubject";
import { CgiServiceService } from "./cgi-service.service";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private _id: string;
  private _role: number;
  private _studentSubjects: Array<StudentSubject>;

  constructor(private cgiService: CgiServiceService) {}

  setID(id: string) {
    this._id = id;
  }

  getID() {
    return this._id;
  }

  async getRole(id: string) {
    if (!this._role) {
      this._role = await this.cgiService.getRole(id);
      return this._role;
    } else {
      return this._role;
    }
  }

  async getStudentSubjects(id: string) {
    if (!this._studentSubjects) {
      this._studentSubjects = await this.cgiService.fetchStudentSubject(id);
      return this._studentSubjects;
    } else {
      return this._studentSubjects;
    }
  }
}

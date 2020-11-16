import { Injectable } from "@angular/core";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { FsksmServiceService } from "./fsksm-service.service";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private _id: string; //matric / no_pekerja
  private _role: number; // 1/2 student/lecturer

  private _studentSubjects: Array<StudentSubject>;
  private _lecturerSubjects: Array<StudentSubject>;

  constructor(private fsksmService: FsksmServiceService) {}

  /**
   * when logout
   */
  clearData() {
    this._id = null;
    this._role = null;
    this._studentSubjects = null;
    this._lecturerSubjects = null;
  }

  setID(id: string) {
    this._id = id;
  }

  getID() {
    return this._id;
  }

  setRole(role: number) {
    this._role = role;
  }

  getRole() {
    return this._role;
  }

  async getStudentSubjects(id: string) {
    if (!this._studentSubjects) {
      this._studentSubjects = await this.fsksmService.fetchStudentSubject(id);
      return this._studentSubjects;
    } else {
      return this._studentSubjects;
    }
  }

  async getLecturerSubject(id: string) {
    if (!this._lecturerSubjects) {
      this._lecturerSubjects = await this.fsksmService.fetchLecturerSubject(id);
      return this._lecturerSubjects;
    } else {
      return this._lecturerSubjects;
    }
  }
}

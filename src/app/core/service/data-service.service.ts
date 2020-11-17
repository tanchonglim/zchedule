import { Injectable } from "@angular/core";
import { LecturerSubject } from "src/app/shared/models/LecturerSubject";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { ScheduleSubject } from "src/app/shared/models/ScheduleSubject";
import { FsksmServiceService } from "./fsksm-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";

import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private _id: string = "A18CS0255"; //matric / no_pekerja
  private _role: number; // 1/2 student/lecturer

  private _sesiSemester: Array<SesiSemester>;
  private _studentSubjects: Array<StudentSubject>;
  private _lecturerSubjects: Array<LecturerSubject>;
  private _scheduleSubjectList: Array<ScheduleSubject> = [];

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

  async getSesiSemester() {
    if (!this._sesiSemester) {
      this._sesiSemester = await this.fsksmService.fetchSesiSemester();
      this._sesiSemester = this._sesiSemester.sort((a, b) => {
        return +b.sesi_semester_id - +a.sesi_semester_id;
      });
      return this._sesiSemester;
    } else {
      return this._sesiSemester;
    }
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

  async getSubjectSchedule(
    sesi: string,
    semester: number,
    kod_subjek: string,
    seksyen: number
  ) {
    let index = this._scheduleSubjectList.findIndex((subjectSchedule) => {
      return (
        subjectSchedule.sesi === sesi &&
        subjectSchedule.semester === semester &&
        subjectSchedule.kod_subjek === kod_subjek &&
        subjectSchedule.seksyen === seksyen
      );
    });

    if (index === -1) {
      let schedules = await this.fsksmService.fetchSubjectSchedule(
        sesi,
        semester,
        kod_subjek,
        seksyen
      );
      let scheduleSubject = {
        sesi: sesi,
        semester: semester,
        kod_subjek: kod_subjek,
        seksyen: seksyen,
        dailySchedule: schedules,
      };
      this._scheduleSubjectList.push();
      return scheduleSubject;
    } else {
      return this._scheduleSubjectList[index];
    }
  }
}

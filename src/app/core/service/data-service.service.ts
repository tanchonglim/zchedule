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
  private _currentSesiSem: {
    sesi: string;
    semester: number;
  };

  private _currentStudentSubjects: Array<StudentSubject>;

  private _sesiSemester: Array<SesiSemester>;
  // private _studentSubjects: Array<StudentSubject>;
  // private _lecturerSubjects: Array<LecturerSubject>;
  private _scheduleSubjectList: Array<ScheduleSubject> = [];

  constructor(private fsksmService: FsksmServiceService) {}

  /**
   * when logout
   */
  clearData() {
    this._id = null;
    // this._studentSubjects = null;
    // this._lecturerSubjects = null;
    this._currentStudentSubjects = null;
    this._sesiSemester = null;
    this._scheduleSubjectList = [];
  }

  setID(id: string) {
    this._id = id;
  }

  getID() {
    return this._id;
  }

  async getCurrentSesiSem() {
    this._currentSesiSem = (await this.getSesiSemester())[0];
    return this._currentSesiSem;
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

  async getStudentSubjects(id: string): Promise<Array<StudentSubject>> {
    //only store data of logged in student
    if (id === this._id) {
      if (!this._currentStudentSubjects) {
        this._currentStudentSubjects = await this.fsksmService.fetchStudentSubject(
          id
        );
        return this._currentStudentSubjects;
      } else {
        return this._currentStudentSubjects;
      }
    } else {
      return await this.fsksmService.fetchStudentSubject(id);
    }
  }

  async getLecturerSubject(id: string): Promise<Array<LecturerSubject>> {
    return await this.fsksmService.fetchLecturerSubject(id);
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
      this._scheduleSubjectList.push(scheduleSubject);
      return scheduleSubject;
    } else {
      return this._scheduleSubjectList[index];
    }
  }
}

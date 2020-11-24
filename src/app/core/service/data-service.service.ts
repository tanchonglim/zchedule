import { Injectable } from "@angular/core";
import { LecturerSubject } from "src/app/shared/models/LecturerSubject";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { ScheduleSubject } from "src/app/shared/models/ScheduleSubject";
import { FsksmServiceService } from "./fsksm-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";

import * as moment from "moment";
import { Student } from "src/app/shared/models/Student";
import { Lecturer } from "src/app/shared/models/Lecturer";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private _id: string = "A18CS0255"; //fixed
  private _currentSesiSem: SesiSemester;
  private _adminSessionID: number; //will expire?

  private _currentStudentSubjects: Array<StudentSubject>; //fixed
  private _sesiSemester: Array<SesiSemester>; //fixed
  // private _studentSubjects: Array<StudentSubject>;
  // private _lecturerSubjects: Array<LecturerSubject>;

  //store a list of subjects, with its schedule attached to id
  private _scheduleSubjectList: Array<ScheduleSubject> = []; //

  //studentSubjects, lecturerSubjects (for searching) no store in memory currently

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

  getID(): string {
    return this._id;
  }

  async getCurrentSesiSem(): Promise<SesiSemester> {
    this._currentSesiSem = (await this.getSesiSemester())[0];
    return this._currentSesiSem;
  }

  async getAdminSessionID() {
    if (!this._adminSessionID) {
      this._adminSessionID = await this.fsksmService.getAdminSessionID();
      return this._adminSessionID;
    } else {
      return this._adminSessionID;
    }
  }

  async getSesiSemester(): Promise<Array<SesiSemester>> {
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
        this._currentStudentSubjects = await this.fsksmService.fetchStudentSubjects(
          id
        );
        return this._currentStudentSubjects;
      } else {
        return this._currentStudentSubjects;
      }
    } else {
      return await this.fsksmService.fetchStudentSubjects(id);
    }
  }

  async getLecturerSubjects(id: string): Promise<Array<LecturerSubject>> {
    return await this.fsksmService.fetchLecturerSubjects(id);
  }

  async getSubjectSchedule(
    sesi: string,
    semester: number,
    kod_subjek: string,
    seksyen: number
  ): Promise<ScheduleSubject> {
    let index = this._scheduleSubjectList.findIndex((subjectSchedule) => {
      return (
        subjectSchedule.subject.sesi === sesi &&
        subjectSchedule.subject.semester === semester &&
        subjectSchedule.subject.kod_subjek === kod_subjek &&
        subjectSchedule.subject.seksyen === seksyen
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
        subject: {
          sesi: sesi,
          semester: semester,
          kod_subjek: kod_subjek,
          seksyen: seksyen,
        },
        dailySchedule: schedules,
      };
      this._scheduleSubjectList.push(scheduleSubject);
      return scheduleSubject;
    } else {
      return this._scheduleSubjectList[index];
    }
  }

  async getStudentList(
    kod_kursus: string,
    limit: number,
    offset: number
  ): Promise<Array<Student>> {
    return this.fsksmService.fetchStudentList(
      this._adminSessionID,
      this._currentSesiSem.sesi,
      this._currentSesiSem.semester,
      kod_kursus,
      limit,
      offset
    );
  }

  async getLecturerList(): Promise<Array<Lecturer>> {
    // await this.getCurrentSesiSem(); //tempporary
    // await this.getAdminSessionID(); //temporary
    return [
      {
        nama: "Ali",
        bil_pelajar: 10,
        bil_seksyen: 10,
        no_pekerja: 11,
        bil_subjek: 10,
      },
      {
        nama: "Ali",
        bil_pelajar: 10,
        bil_seksyen: 10,
        no_pekerja: 11,
        bil_subjek: 10,
      },
      {
        nama: "Ali",
        bil_pelajar: 10,
        bil_seksyen: 10,
        no_pekerja: 11,
        bil_subjek: 10,
      },
      {
        nama: "Ali",
        bil_pelajar: 10,
        bil_seksyen: 10,
        no_pekerja: 11,
        bil_subjek: 10,
      },
    ];

    return this.fsksmService.fetchLecturerList(
      this._adminSessionID,
      this._currentSesiSem.sesi,
      this._currentSesiSem.semester
    );
  }
}

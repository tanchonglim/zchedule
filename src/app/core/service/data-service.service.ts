import { EventEmitter, Injectable } from "@angular/core";
import { LecturerSubject } from "src/app/shared/models/LecturerSubject";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { ScheduleSubject } from "src/app/shared/models/ScheduleSubject";
import { FsksmServiceService } from "./fsksm-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";

import * as moment from "moment";
import * as _ from "lodash";
import { Student } from "src/app/shared/models/Student";
import { Lecturer } from "src/app/shared/models/Lecturer";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  //current logged in users data, need to store in localstorage
  private _id: string = "A18CS0255";
  private _currentSesiSem: SesiSemester = {
    tarikh_tamat: "2021-01-30",
    sesi: "2020/2021",
    sesi_semester_id: "202020211",
    tarikh_mula: "2020-10-18",
    semester: 1,
  };
  private _adminSessionID: number;

  private _currentStudentSubjects: {
    param: {
      id: string;
    };
    subjects: Array<StudentSubject>;
  };
  private _sesiSemester: Array<SesiSemester> = [];

  //other data, need to store in localstorage??
  private _studentSubjects: Array<{
    param: {
      id: string;
    };
    subjects: Array<StudentSubject>;
  }> = [];
  private _lecturerSubjects: Array<{
    param: {
      id: string;
    };
    subjects: Array<LecturerSubject>;
  }> = [];

  private _scheduleSubjects: Array<{
    params: {
      sesi: string;
      semester: number;
      kod_subjek: string;
      seksyen: number;
    };
    schedules: Array<ScheduleSubject>;
  }> = []; //

  //need clear when change sesi semester
  private _studentsList: Array<{
    params: {
      kod_kursus: string;
      limit: number;
      offset: number;
    };
    students: Array<Student>;
  }> = [];

  //need clear when change sesi semester
  private _lecturerList: Array<Lecturer> = [];

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
    this._scheduleSubjects = [];
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
    if (!this._sesiSemester.length) {
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
    //if is current user
    if (id === this._id) {
      if (!this._currentStudentSubjects) {
        this._currentStudentSubjects = {
          param: {
            id: id,
          },
          subjects: await this.fsksmService.fetchStudentSubjects(id),
        };

        return this._currentStudentSubjects.subjects;
      } else {
        return this._currentStudentSubjects.subjects;
      }

      //if is other students
    } else {
      let index = this._studentSubjects.findIndex((ss) => ss.param.id === id);
      //if data in memory
      if (index !== -1) {
        return this._studentSubjects[index].subjects;
        //if data not in memory
      } else {
        let length = this._studentSubjects.push({
          param: {
            id: id,
          },
          subjects: await this.fsksmService.fetchStudentSubjects(id),
        });
        return this._studentSubjects[length - 1].subjects;
      }
    }
  }

  async getLecturerSubjects(id: string): Promise<Array<LecturerSubject>> {
    let index = this._lecturerSubjects.findIndex((ls) => ls.param.id === id);

    //if data in memory
    if (index !== -1) {
      return this._lecturerSubjects[index].subjects;
      //if data not in memory
    } else {
      let length = this._lecturerSubjects.push({
        param: {
          id: id,
        },
        subjects: await this.fsksmService.fetchLecturerSubjects(id),
      });
      return this._lecturerSubjects[length - 1].subjects;
    }
  }

  async getScheduleSubject(
    sesi: string,
    semester: number,
    kod_subjek: string,
    seksyen: number
  ): Promise<Array<ScheduleSubject>> {
    let params = {
      sesi: sesi,
      semester: semester,
      kod_subjek: kod_subjek,
      seksyen: seksyen,
    };
    let index = this._scheduleSubjects.findIndex((ss) =>
      _.isEqual(ss.params, params)
    );
    //if data in memory
    if (index !== -1) {
      return this._scheduleSubjects[index].schedules;

      //if data not in memory
    } else {
      let length = this._scheduleSubjects.push({
        params: params,
        schedules: await this.fsksmService.fetchScheduleSubject(
          sesi,
          semester,
          kod_subjek,
          seksyen
        ),
      });
      return this._scheduleSubjects[length - 1].schedules;
    }
  }

  async getStudentList(
    kod_kursus: string,
    limit: number,
    offset: number
  ): Promise<Array<Student>> {
    await this.getAdminSessionID(); //temporary
    let params = {
      kod_kursus: kod_kursus,
      limit: limit,
      offset: offset,
    };

    let index = this._studentsList.findIndex((sl) =>
      _.isEqual(sl.params, params)
    );

    console.log(this._studentsList);
    //if data in memory
    if (index !== -1) {
      return this._studentsList[index].students;
    } else {
      let length = this._studentsList.push({
        params: params,
        students: await this.fsksmService.fetchStudentList(
          this._adminSessionID,
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester,
          kod_kursus,
          limit,
          offset
        ),
      });

      return this._studentsList[length - 1].students;
    }
  }

  async getLecturerList(): Promise<Array<Lecturer>> {
    await this.getAdminSessionID(); //temporary
    if (!this._lecturerList.length) {
      this._lecturerList = await this.fsksmService.fetchLecturerList(
        this._adminSessionID,
        this._currentSesiSem.sesi,
        this._currentSesiSem.semester
      );
      return this._lecturerList;
    } else {
      return this._lecturerList;
    }
  }
}

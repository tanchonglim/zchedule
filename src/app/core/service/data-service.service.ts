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
import { Subject } from "./../../shared/models/Subject";
import { SubjectSection } from "src/app/shared/models/SubjectSection";
import { SubjectLecturer } from "src/app/shared/models/SubjectLecturer";
import { SubjectStudent } from "src/app/shared/models/SubjectStudent";
import { Room } from "./../../shared/models/Room";

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
      kod_subjek: string;
      seksyen: number;
    };
    schedules: Array<ScheduleSubject>;
  }> = []; //

  //need clear when change sesi semester
  private _students: Array<{
    params: {
      kod_kursus: string;
      limit: number;
      offset: number;
    };
    students: Array<Student>;
  }> = [];

  //need clear when change sesi semester
  private _subjects: Array<Subject> = [];

  //need clear when change sesi semester
  private _rooms: Array<Room> = [];

  //need clear when change sesi semester
  private _subjectSections: Array<SubjectSection> = [];

  //need clear when change sesi semester
  private _subjectLecturer: Array<{
    params: {
      kod_subjek: string;
    };
    lecturers: Array<SubjectLecturer>;
  }> = [];

  //need clear when change sesi semester
  private _subjectstudent: Array<{
    params: {
      kod_subjek: string;
      seksyen: number;
    };
    students: Array<SubjectStudent>;
  }> = [];

  //need clear when change sesi semester
  private _lecturers: Array<Lecturer> = [];

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

  async getStudentSubjects(
    id: string,
    sesi?: string,
    semester?: number
  ): Promise<Array<StudentSubject>> {
    let subjects: Array<StudentSubject>;
    //if is current user
    if (id === this._id) {
      if (!this._currentStudentSubjects) {
        this._currentStudentSubjects = {
          param: {
            id: id,
          },
          subjects: await this.fsksmService.fetchStudentSubjects(id),
        };

        subjects = this._currentStudentSubjects.subjects;
      } else {
        subjects = this._currentStudentSubjects.subjects;
      }

      //if is other students
    } else {
      let index = this._studentSubjects.findIndex((ss) => ss.param.id === id);
      //if data in memory
      if (index !== -1) {
        subjects = this._studentSubjects[index].subjects;
        //if data not in memory
      } else {
        let length = this._studentSubjects.push({
          param: {
            id: id,
          },
          subjects: await this.fsksmService.fetchStudentSubjects(id),
        });
        subjects = this._studentSubjects[length - 1].subjects;
      }
    }

    if (!sesi || !semester) return subjects;

    return subjects.filter((subject) => {
      return subject.sesi === sesi && subject.semester === semester;
    });
  }

  async getLecturerSubjects(
    id: string,
    sesi?: string,
    semester?: number
  ): Promise<Array<LecturerSubject>> {
    let subjects: Array<LecturerSubject>;

    let index = this._lecturerSubjects.findIndex((ls) => ls.param.id === id);

    //if data in memory
    if (index !== -1) {
      subjects = this._lecturerSubjects[index].subjects;
      //if data not in memory
    } else {
      let length = this._lecturerSubjects.push({
        param: {
          id: id,
        },
        subjects: await this.fsksmService.fetchLecturerSubjects(id),
      });
      subjects = this._lecturerSubjects[length - 1].subjects;
    }

    if (!sesi || !semester) return subjects;
    return subjects.filter((subject) => {
      return subject.sesi === sesi && subject.semester === semester;
    });
  }

  async getScheduleSubject(
    kod_subjek: string,
    seksyen: number
  ): Promise<Array<ScheduleSubject>> {
    let params = {
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
        schedules: await this.fsksmService.fetchScheduleSubjects(
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester,
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

    let index = this._students.findIndex((sl) => _.isEqual(sl.params, params));

    //if data in memory
    if (index !== -1) {
      return this._students[index].students;
    } else {
      let length = this._students.push({
        params: params,
        students: await this.fsksmService.fetchStudents(
          this._adminSessionID,
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester,
          kod_kursus,
          limit,
          offset
        ),
      });

      return this._students[length - 1].students;
    }
  }

  async getLecturerList(): Promise<Array<Lecturer>> {
    await this.getAdminSessionID(); //temporary
    if (!this._lecturers.length) {
      this._lecturers = await this.fsksmService.fetchLecturers(
        this._adminSessionID,
        this._currentSesiSem.sesi,
        this._currentSesiSem.semester
      );
      return this._lecturers;
    } else {
      return this._lecturers;
    }
  }

  async getSubjectList(): Promise<Array<Subject>> {
    if (!this._subjects.length) {
      this._subjects = await this.fsksmService.fetchSubjects(
        this._currentSesiSem.sesi,
        this._currentSesiSem.semester
      );
      return this._subjects;
    } else {
      return this._subjects;
    }
  }

  async getSubjectSections(): Promise<Array<SubjectSection>> {
    if (!this._subjectSections.length) {
      this._subjectSections = await this.fsksmService.fetchSubjectSections(
        this._currentSesiSem.sesi,
        this._currentSesiSem.semester
      );
      return this._subjectSections;
    } else {
      return this._subjectSections;
    }
  }
  async getSubjectLecturer(
    kod_subjek: string
  ): Promise<Array<SubjectLecturer>> {
    let params = {
      kod_subjek: kod_subjek,
    };
    let index = this._subjectLecturer.findIndex((sl) =>
      _.isEqual(sl.params, params)
    );

    //if found
    if (index !== -1) {
      return this._subjectLecturer[index].lecturers;
    } else {
      let length = this._subjectLecturer.push({
        params: params,
        lecturers: await this.fsksmService.fetchSubjectLecturer(
          kod_subjek,
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester
        ),
      });
      return this._subjectLecturer[length - 1].lecturers;
    }
  }

  async getSubjectStudent(
    kod_subjek: string,
    seksyen: number
  ): Promise<Array<SubjectStudent>> {
    await this.getAdminSessionID();
    let params = {
      kod_subjek: kod_subjek,
      seksyen: seksyen,
    };
    let index = this._subjectstudent.findIndex((sl) =>
      _.isEqual(sl.params, params)
    );

    //if found
    if (index !== -1) {
      return this._subjectstudent[index].students;
    } else {
      let length = this._subjectstudent.push({
        params: params,
        students: await this.fsksmService.fetchSubjectStudent(
          this._adminSessionID,
          kod_subjek,
          seksyen,
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester
        ),
      });
      return this._subjectstudent[length - 1].students;
    }
  }

  async getRoomList(): Promise<Array<Room>> {
    if (!this._rooms.length) {
      this._rooms = await this.fsksmService.fetchRooms();
      return this._rooms;
    } else {
      return this._rooms;
    }
  }
}

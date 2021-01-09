import { Injectable } from "@angular/core";
import { LecturerSubject } from "src/app/shared/models/LecturerSubject";
import { StudentSubject } from "src/app/shared/models/StudentSubject";
import { ScheduleSubject } from "src/app/shared/models/ScheduleSubject";
import { FsksmServiceService } from "./fsksm-service.service";
import { SesiSemester } from "src/app/shared/models/SesiSemester";

import { Student } from "./../../shared/models/Student";
import { Lecturer } from "./../../shared/models/Lecturer";
import { Subject } from "./../../shared/models/Subject";
import { SubjectSection } from "./../../shared/models/SubjectSection";
import { SubjectLecturer } from "./../../shared/models/SubjectLecturer";
import { SubjectStudent } from "./../../shared/models/SubjectStudent";
import { Room } from "./../../shared/models/Room";

import { isEqual } from "lodash";
import { ScheduleRoom } from "./../../shared/models/ScheduleRoom";
import { Auth } from "../../shared/models/Auth";
import { GMMStudentService } from "./gmmstudent.service";
import { Storage } from "@ionic/storage";
import {
  IonicAngularThemeSwitchService,
  IonicColors,
} from "ionic-angular-theme-switch";
import { themes } from "src/app/user/Theme";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private _currentTheme: IonicColors;
  private _currentUserCredential: { login: string; password: string };
  private _currentUser: Auth;

  private _currentSesiSem: SesiSemester;

  private _currentStudentSubjects: {
    param: {
      id: string;
    };
    subjects: Array<StudentSubject>;
  };

  private _sesiSemester: Array<SesiSemester> = [];

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
  }> = [];

  private _students: Array<{
    params: {
      kod_kursus: string;
      limit: number;
      offset: number;
    };
    students: Array<Student>;
  }> = [];

  private _subjects: Array<Subject> = [];

  private _rooms: Array<Room> = [];

  private _roomSchedule: Array<{
    params: {
      kod_ruang: string;
    };
    schedule: Array<ScheduleRoom>;
  }> = [];

  private _subjectSections: Array<SubjectSection> = [];

  private _subjectLecturer: Array<{
    params: {
      kod_subjek: string;
    };
    lecturers: Array<SubjectLecturer>;
  }> = [];

  private _subjectstudent: Array<{
    params: {
      kod_subjek: string;
      seksyen: number;
    };
    students: Array<SubjectStudent>;
  }> = [];

  private _lecturers: Array<Lecturer> = [];

  private isOfflineMode: Boolean;

  constructor(
    private fsksmService: FsksmServiceService,
    private gmmService: GMMStudentService,
    private storage: Storage,
    private themeSwitchService: IonicAngularThemeSwitchService
  ) {}

  async init() {
    this._currentUserCredential = await this.storage.get(
      "_currentUserCredential"
    );

    this.isOfflineMode = (await this.storage.get("offlineMode")) || false;

    this._currentTheme = await this.storage.get("_currentTheme");

    if (this._currentTheme) {
      this.setCurrentTheme(this._currentTheme);
    } else {
      this.setCurrentTheme();
    }

    //if is offlinemode, try to get all cached data
    if (this.isOfflineMode) {
      await this.fetchOfflineData();
    }

    //if not offline mode,
    if (!this.isOfflineMode) {
      //if already logged in before,
      if (this._currentUserCredential) {
        //try to login
        this._currentUser = await this.login(
          this._currentUserCredential.login,
          this._currentUserCredential.password
        );
      }
    }

    this._sesiSemester = await this.getSesiSemester();
    this._currentSesiSem = await this.getCurrentSesiSem();
  }

  async getCurrentTheme() {
    return this._currentTheme;
  }

  async setCurrentTheme(theme?: IonicColors) {
    if (theme) {
      await this.storage.set("_currentTheme", theme);
      this._currentTheme = theme;
      this.themeSwitchService.setTheme(theme);
    } else {
      await this.storage.set("_currentTheme", themes[0]);
      this._currentTheme = themes[0];
      this.themeSwitchService.setTheme(themes[0]);
    }
  }

  getOfflineMode() {
    return this.isOfflineMode;
  }

  async setOfflineMode(status) {
    //if set to true, store possible data in localstorage
    if (status) await this.setOfflineData();

    //set the mode
    await this.storage.set("offlineMode", status);
    this.isOfflineMode = status;
  }

  /**
   * login again with current login and password, then fetch all the offline data (each functions will store the data in local storage)
   */
  async setOfflineData() {
    if (!this.isOfflineMode) {
      //get current user from local storage
      let currentUserCredential = await this.storage.get(
        "_currentUserCredential"
      );
      let currentUser: Auth = await this.login(
        currentUserCredential.login,
        currentUserCredential.password
      );

      let currentSesiSemester = (await this.getSesiSemester())[0];
      let currentStudentSubjects = {
        params: { id: currentUser.login_name },
        subjects: await this.getStudentSubjects(
          currentUser.login_name,
          currentSesiSemester.sesi,
          currentSesiSemester.semester
        ),
      };

      for (let subject of currentStudentSubjects.subjects) {
        this.getScheduleSubject(subject.kod_subjek, subject.seksyen);
        this.getSubjectLecturer(subject.kod_subjek);
      }
    }
  }

  /**
   * call this when is offline mode
   */
  async fetchOfflineData() {
    this._currentUser = await this.storage.get("_currentUser");
    this._currentSesiSem = await this.storage.get("_currentSesiSem");
    this._sesiSemester = await this.storage.get("_sesiSemester");
    this._currentStudentSubjects = await this.storage.get(
      "_currentStudentSubjects"
    );
    this._scheduleSubjects = await this.storage.get("_scheduleSubjects");
    this._subjectLecturer = await this.storage.get("_subjectLecturer");
  }

  //use when change sesi semester
  clearData() {
    this._currentStudentSubjects = null;
    this._scheduleSubjects = [];
    this._students = [];
    this._subjects = [];
    this._roomSchedule = [];
    this._subjectSections = [];
    this._subjectLecturer = [];
    this._subjectstudent = [];
    this._lecturers = [];
  }

  //use when logged out
  clearAllData() {
    this.clearData();
    this.storage.clear();
    this.isOfflineMode = false;
    this._currentUser = null;
    this._currentUserCredential = null;
    this._currentSesiSem = null;
    this._sesiSemester = [];
    this._studentSubjects = [];
    this._lecturerSubjects = [];
    this._rooms = [];
  }

  async login(login: string, password: string): Promise<Auth> {
    let user = await this.gmmService.authentication(login, password);
    if (user && user.session_id && user.admin_session_id) {
      this.setCurrentUser(user);
      this.setCurrentUserCredential(login, password);
      return this._currentUser;
    } else {
      return null;
    }
  }

  isLoggedIn() {
    return this._currentUser;
  }

  setCurrentUserCredential(login: string, password: string) {
    this._currentUserCredential = {
      login: login,
      password: password,
    };
    this.storage.set("_currentUserCredential", this._currentUserCredential);
  }

  setCurrentUser(auth: Auth) {
    this._currentUser = auth;
    this.storage.set("_currentUser", auth);
  }

  async getCurrentUserCredential(): Promise<{
    login: string;
    password: string;
  }> {
    this._currentUserCredential = await this.storage.get(
      "_currentUserCredential"
    );
    return this._currentUserCredential;
  }

  getAuthUser(): Auth {
    return this._currentUser;
  }

  async getCurrentSesiSem(): Promise<SesiSemester> {
    if (!this._currentSesiSem) {
      this._currentSesiSem =
        (await this.getSesiSemester()).find((ss) =>
          moment().isBetween(moment(ss.tarikh_mula), moment(ss.tarikh_tamat))
        ) || (await this.getSesiSemester())[0];
    }
    this.storage.set("_currentSesiSem", this._currentSesiSem);
    return this._currentSesiSem;
  }

  setCurrentSesiSem(sesiSem: SesiSemester) {
    this.clearData();
    this._currentSesiSem = sesiSem;
    this.storage.set("_currentSesiSem", this._currentSesiSem);
    console.log(this._currentSesiSem);
  }

  async getSesiSemester(): Promise<Array<SesiSemester>> {
    if (!this._sesiSemester.length) {
      this._sesiSemester = await this.fsksmService.fetchSesiSemester();
      this._sesiSemester = this._sesiSemester.sort((a, b) => {
        return +b.sesi_semester_id - +a.sesi_semester_id;
      });
    }
    this.storage.set("_sesiSemester", this._sesiSemester);
    return this._sesiSemester;
  }

  async getStudentSubjects(
    id: string,
    sesi?: string,
    semester?: number
  ): Promise<Array<StudentSubject>> {
    let subjects: Array<StudentSubject>;
    //if is current user
    if (id === this._currentUser.login_name) {
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

    this.storage.set("_currentStudentSubjects", this._currentStudentSubjects);

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
      isEqual(ss.params, params)
    );
    //if data in memory
    if (index !== -1) {
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
      index = length - 1;
    }

    this.storage.set("_scheduleSubjects", this._scheduleSubjects);
    return this._scheduleSubjects[index].schedules;
  }

  async getStudentList(
    kod_kursus: string,
    limit: number,
    offset: number
  ): Promise<Array<Student>> {
    let params = {
      kod_kursus: kod_kursus,
      limit: limit,
      offset: offset,
    };

    let index = this._students.findIndex((sl) => isEqual(sl.params, params));

    //if data in memory
    if (index !== -1) {
      return this._students[index].students;
    } else {
      let length = this._students.push({
        params: params,
        students: await this.fsksmService.fetchStudents(
          this._currentUser.admin_session_id,
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
    if (!this._lecturers.length) {
      this._lecturers = await this.fsksmService.fetchLecturers(
        this._currentUser.admin_session_id,
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

  async getSubjectsSections(): Promise<Array<SubjectSection>> {
    if (!this._subjectSections.length) {
      this._subjectSections = await this.fsksmService.fetchSubjectsSections(
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
      isEqual(sl.params, params)
    );

    //if found
    if (index !== -1) {
    } else {
      let length = this._subjectLecturer.push({
        params: params,
        lecturers: await this.fsksmService.fetchSubjectLecturer(
          kod_subjek,
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester
        ),
      });
      index = length - 1;
    }
    this.storage.set("_subjectLecturer", this._subjectLecturer);
    return this._subjectLecturer[index].lecturers;
  }

  async getSubjectStudent(
    kod_subjek: string,
    seksyen: number
  ): Promise<Array<SubjectStudent>> {
    let params = {
      kod_subjek: kod_subjek,
      seksyen: seksyen,
    };
    let index = this._subjectstudent.findIndex((sl) =>
      isEqual(sl.params, params)
    );

    //if found
    if (index !== -1) {
      return this._subjectstudent[index].students;
    } else {
      let length = this._subjectstudent.push({
        params: params,
        students: await this.fsksmService.fetchSubjectStudent(
          this._currentUser.admin_session_id,
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

  async getRoomSchedules(kod_ruang: string): Promise<Array<ScheduleRoom>> {
    let params = {
      kod_ruang: kod_ruang,
    };
    let index = this._roomSchedule.findIndex(
      (rs) => rs.params.kod_ruang == kod_ruang
    );
    if (index == -1) {
      let length = this._roomSchedule.push({
        params: params,
        schedule: await this.fsksmService.fetchRoomSchedule(
          kod_ruang,
          this._currentSesiSem.sesi,
          this._currentSesiSem.semester
        ),
      });

      return this._roomSchedule[length - 1].schedule;
    } else {
      return this._roomSchedule[index].schedule;
    }
  }
}

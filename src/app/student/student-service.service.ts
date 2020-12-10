import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { Student } from "../shared/models/Student";
import { flatMap } from "lodash";

@Injectable({
  providedIn: "root",
})
export class StudentServiceService {
  constructor(private ds: DataServiceService) {}

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  async getTimetable(id: string): Promise<TimetableData> {
    let timetableData: TimetableData = {
      slots: [],
    };
    let subjects = await this.ds.getStudentSubjects(
      id,
      (await this.ds.getCurrentSesiSem()).sesi,
      (await this.ds.getCurrentSesiSem()).semester
    );

    let subjectType = 1;
    for (let subject of subjects) {
      let schedules = await this.ds.getScheduleSubject(
        subject.kod_subjek,
        subject.seksyen
      );
      let lecturerName = (
        await this.ds.getSubjectLecturer(subject.kod_subjek)
      ).filter((sl) => sl.seksyen === subject.seksyen)[0].nama;

      schedules.forEach((schedule) => {
        timetableData.slots.push({
          day: schedule.hari,
          timeSlot: schedule.masa,
          data: {
            data: subject.nama_subjek,
            detail: `Subject Code: ${subject.kod_subjek}\nSection: ${
              subject.seksyen
            }\nLecturer: ${lecturerName || "-"} \nVenue: ${
              schedule.ruang.nama_ruang || "-"
            }`,
            type: subjectType,
          },
        });
      });
      subjectType++;
    }

    return timetableData;
  }

  async getStudentSubjects(id: string) {
    let studentSubjects = await this.ds.getStudentSubjects(id);

    return studentSubjects.map((subject) => {
      return {
        nama_subjek: subject.nama_subjek,
        kod_subjek: subject.kod_subjek,
        semester: subject.semester,
        sesi: subject.sesi,
        seksyen: subject.seksyen,
      };
    });
  }

  async getStudentList(kod_kursus: string) {
    await this.ds.getCurrentSesiSem(); //temp
    await this.ds.getAdminSessionID(); //temp

    //fliter logic
    let offset = 0;
    let studentList: Array<any> = [];
    let allStudentList: Array<Student> = [];

    do {
      let promises = [
        this.ds.getStudentList(kod_kursus, 100, offset),
        this.ds.getStudentList(kod_kursus, 100, offset + 100),
        this.ds.getStudentList(kod_kursus, 100, offset + 200),
      ];
      studentList = await Promise.all(promises);
      allStudentList = [
        ...allStudentList,
        ...flatMap(studentList).filter((student) => {
          return student.nama && student.no_matrik;
        }),
      ];
      offset += 300;
    } while (studentList[2].length > 1);

    return allStudentList;
  }
}

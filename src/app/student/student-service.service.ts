import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { Student } from "../shared/models/Student";

@Injectable({
  providedIn: "root",
})
export class StudentServiceService {
  constructor(private ds: DataServiceService) {}

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  async getTimetable(
    id: string,
    sesi: string,
    semester: number
  ): Promise<TimetableData> {
    let timetableData: TimetableData = {
      slots: [],
    };
    let subjects = await this.ds.getStudentSubjects(id);
    subjects = subjects.filter((subject) => {
      return subject.sesi === sesi && subject.semester === semester;
    });

    let subjectType = 1;
    for (let subject of subjects) {
      let schedules = await this.ds.getScheduleSubject(
        sesi,
        semester,
        subject.kod_subjek,
        subject.seksyen
      );
      schedules.forEach((schedule) => {
        timetableData.slots.push({
          day: schedule.hari,
          timeSlot: schedule.masa,
          data: {
            data: subject.nama_subjek,
            detail: "",
            type: subjectType,
          },
        });
      });
      subjectType++;
    }

    return timetableData;
  }

  async getStudentSubjects(id: string) {
    return this.ds.getStudentSubjects(id);
  }

  async getFilteredStudentList(searchString: string, kod_kursus: string) {
    await this.ds.getCurrentSesiSem(); //temp
    await this.ds.getAdminSessionID(); //temp

    //fliter logic
    let offset = 0;
    let studentList: Array<Student> = [];
    let filteredStudentList: Array<Student> = [];
    console.log(searchString, kod_kursus);
    do {
      studentList = await this.ds.getStudentList(kod_kursus, 100, offset);
      filteredStudentList = [
        ...filteredStudentList,
        ...studentList.filter((student) => {
          if (student.nama && student.no_matrik)
            return (
              student.nama
                .toLowerCase()
                .trim()
                .includes(searchString.trim().toLowerCase()) ||
              student.no_matrik
                .toLowerCase()
                .trim()
                .includes(searchString.trim().toLowerCase())
            );
          else return false;
        }),
      ];

      offset += 100;
    } while (studentList.length > 1);

    return filteredStudentList;
  }
}

import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";

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

    for (let subject of subjects) {
      let schedule = await this.ds.getSubjectSchedule(
        sesi,
        semester,
        subject.kod_subjek,
        subject.seksyen
      );
      schedule.dailySchedule.forEach((dailySchedule) => {
        timetableData.slots.push({
          day: dailySchedule.hari,
          timeSlot: dailySchedule.masa,
          data: subject.nama_subjek,
        });
      });
    }

    return timetableData;
  }

  async getStudentSubjects(id: string) {
    return this.ds.getStudentSubjects(id);
  }
}

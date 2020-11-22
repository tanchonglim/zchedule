import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/models/TimetableData";

@Injectable({
  providedIn: "root",
})
export class LecturerServiceService {
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
    let subjects = await this.ds.getLecturerSubject(id);
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

  async getLecturerSubject(id: string) {
    return this.ds.getLecturerSubject(id);
  }
}

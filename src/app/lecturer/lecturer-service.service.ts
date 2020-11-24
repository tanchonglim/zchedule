import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { Lecturer } from "./../shared/models/Lecturer";

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
    let subjects = await this.ds.getLecturerSubjects(id);
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
    return this.ds.getLecturerSubjects(id);
  }

  async getFilteredLecturerList(searchString: string) {
    let lecturerList: Array<Lecturer> = [];
    let filteredLecturerList: Array<Lecturer> = [];

    lecturerList = await this.ds.getLecturerList();
    filteredLecturerList = lecturerList.filter((lect) =>
      lect.nama.toLowerCase().trim().includes(searchString)
    );

    return filteredLecturerList;
  }
}

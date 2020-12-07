import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";

@Injectable({
  providedIn: "root",
})
export class HomeServiceService {
  constructor(private ds: DataServiceService) {}

  async initiate() {
    this.ds.getCurrentSesiSem();
    this.ds.getAdminSessionID();
  }

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  getID() {
    return this.ds.getID();
  }

  async getTimetable(
    id: string,
    sesi: string,
    semester: number
  ): Promise<TimetableData> {
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
      schedules.forEach((schedule) => {
        timetableData.slots.push({
          day: schedule.hari,
          timeSlot: schedule.masa,
          data: {
            data: subject.nama_subjek,
            detail: `Subject Code: ${subject.kod_subjek}\nSection: ${subject.seksyen}\nVenue: ${schedule.ruang.nama_ruang}`,
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
}

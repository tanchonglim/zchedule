import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { Lecturer } from "./../shared/models/Lecturer";
import { RegisteredSubjectListData } from "./../shared/components/list-subject/list-subject.component";

@Injectable({
  providedIn: "root",
})
export class LecturerServiceService {
  constructor(private ds: DataServiceService) {}

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  async getLecturerList() {
    return this.ds.getLecturerList();
  }

  async getTimetable(id: string): Promise<TimetableData> {
    let timetableData: TimetableData = {
      slots: [],
    };
    let subjects = await this.ds.getLecturerSubjects(
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
            data: subject.kod_subjek,
            detail: `Subject Name: ${subject.nama_subjek}\nSection: ${
              subject.seksyen < 10 ? "0" + subject.seksyen : subject.seksyen
            }\nVenue: ${schedule.ruang.nama_ruang || "-"}`,
            type: subjectType,
          },
        });
      });
      subjectType++;
    }

    return timetableData;
  }

  async getLecturerSubjectData(
    id: string
  ): Promise<Array<RegisteredSubjectListData>> {
    let lecturerSubject = await this.ds.getLecturerSubjects(id);
    return lecturerSubject.map((subject) => {
      return {
        nama_subjek: subject.nama_subjek,
        kod_subjek: subject.kod_subjek,
        semester: subject.semester,
        sesi: subject.sesi,
        bil_pelajar: subject.bil_pelajar,
        seksyen: subject.seksyen,
      };
    });
  }

  async isAdmin() {
    return (await this.ds.getAuthUser()).role == "3";
  }
}

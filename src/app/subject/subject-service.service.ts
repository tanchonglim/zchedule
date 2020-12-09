import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { SubjectSection } from "../shared/models/SubjectSection";
import { SubjectStudent } from "../shared/models/SubjectStudent";
import { Subject } from "./../shared/models/Subject";

@Injectable({
  providedIn: "root",
})
export class SubjectServiceService {
  constructor(private ds: DataServiceService) {}

  async getSubjects() {
    return this.ds.getSubjectList();
  }

  async getSubjectSections(subjectCode: string): Promise<SubjectSection> {
    let subjectSections = await this.ds.getSubjectSections();
    return subjectSections.filter(
      (section) => section.kod_subjek === subjectCode
    )[0];
  }

  async getTimetabledata(
    subjectCode: string,
    section: number
  ): Promise<TimetableData> {
    let schedules = await this.ds.getScheduleSubject(subjectCode, section);

    return {
      slots: schedules.map((schedule) => {
        return {
          day: schedule.hari,
          timeSlot: schedule.masa,
          data: {
            data: schedule.ruang.nama_ruang,
            detail: null,
            type: 1,
          },
        };
      }),
    };
  }

  async getSubjectStudents(
    subjectCode: string,
    section: number
  ): Promise<Array<SubjectStudent>> {
    return await this.ds.getSubjectStudent(subjectCode, section);
  }
}

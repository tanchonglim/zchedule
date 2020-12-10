import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { Room } from "./../shared/models/Room";
import { ScheduleRoom } from "./../shared/models/ScheduleRoom";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { flatten, groupBy, isEqual, orderBy, values } from "lodash";

@Injectable({
  providedIn: "root",
})
export class RoomServiceService {
  constructor(private ds: DataServiceService) {}

  async getCurrentSesiSem() {
    return this.ds.getCurrentSesiSem();
  }

  async getRoomList(): Promise<Array<Room>> {
    return await this.ds.getRoomList();
  }

  // async getRoomList() {
  //   return await this.ds.getRoomList();
  // }

  async getRoomSchedule(kod_ruang: string): Promise<Array<ScheduleRoom>> {
    return await this.ds.getRoomSchedules(kod_ruang);
  }

  async getRoomTimetable(kod_ruang: string): Promise<TimetableData> {
    let schedules = await this.ds.getRoomSchedules(kod_ruang);
    schedules = orderBy(
      schedules,
      ["subjek.kod_subjek", "subjek.seksyen"],
      ["asc", "asc"]
    );

    let timetableData: TimetableData = { slots: [] };

    let schedulesGroup: Array<Array<ScheduleRoom>>;

    schedulesGroup = flatten(
      values(groupBy(schedules, "hari")).map((s) => values(groupBy(s, "masa")))
    );
    console.log(schedulesGroup);
    schedulesGroup.forEach((schedule, index) => {
      let data = "";
      schedule.forEach((s) => {
        data += `${s.subjek.kod_subjek}\n`;
      });

      let detail = "";
      schedule.forEach((s) => {
        detail += `Subject: ${s.subjek.kod_subjek}- ${
          s.subjek.seksyen < 10 ? "0" + s.subjek.seksyen : s.subjek.seksyen
        }\n`;
      });

      timetableData.slots.push({
        day: schedule[0].hari,
        timeSlot: schedule[0].masa,
        data: {
          data: data,
          detail: detail,
          type: index + 1,
        },
      });
    });

    return timetableData;
  }
}

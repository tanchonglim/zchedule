import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { Room } from "./../shared/models/Room";
import { ScheduleRoom } from "./../shared/models/ScheduleRoom";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { orderBy } from "lodash";
import { isEqual } from "lodash";

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

    let type = 1;
    schedules.forEach((schedule, index) => {
      if (index !== 0 && !isEqual(schedule.subjek, schedules[index - 1].subjek))
        type++;
      console.log(schedule);
      timetableData.slots.push({
        day: schedule.hari,
        timeSlot: schedule.masa,
        data: {
          data: schedule.subjek.kod_subjek,
          detail: "",
          type: type,
        },
      });
    });

    return timetableData;
  }
}

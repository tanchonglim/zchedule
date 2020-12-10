import { Component, Input, OnInit } from "@angular/core";
import { Room } from "src/app/shared/models/Room";
import { RoomServiceService } from "../../room-service.service";
import { TimetableData } from "src/app/shared/components/timetable-subjects/timetable-subjects.component";
import { ModalHeaderProps } from "./../../../shared/components/modal-header/modal-header.component";

@Component({
  selector: "app-room-detail",
  templateUrl: "./room-detail.component.html",
  styleUrls: ["./room-detail.component.scss"],
})
export class RoomDetailComponent implements OnInit {
  @Input() room: Room;

  timetableData: TimetableData;

  headerModalProps: ModalHeaderProps;
  selectedTab: number = 0;
  constructor(private rs: RoomServiceService) {}

  ngOnInit() {
    this.headerModalProps = {
      title: this.room.nama_ruang,
      subtitle: this.room.nama_ruang_singkatan,
      tabs: ["Info", "Timetable"],
    };
    this.getRoomTimetable(this.room.kod_ruang);
  }

  async getRoomTimetable(id: string) {
    this.timetableData = await this.rs.getRoomTimetable(id);
  }
}

import { Component, OnInit } from "@angular/core";
import { TimetableData } from "../shared/components/timetable-subjects/timetable-subjects.component";
import { HomeServiceService } from "./home-service.service";
import { StudentSubject } from "./../shared/models/StudentSubject";
import { DataServiceService } from "../core/service/data-service.service";
import { GlobalEventService } from "../core/service/global-event.service";
import { RegisteredSubjectListData } from "../shared/components/list-subject/list-subject.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
  viewMode: any = "subject";
  tabArray: any = [
    {
      name: "subject",
      status: 1,
    },
    {
      name: "timetable",
      status: 0,
    },
  ];
  id: string;
  timetableData: TimetableData;
  registeredSubjectListData: Array<RegisteredSubjectListData> = [];
  registeredSubject: Array<StudentSubject>;

  constructor(private hs: HomeServiceService, private ge: GlobalEventService) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    console.log("home init");
    this.id = this.hs.getID();
    this.getTimetableData();
    this.getSubjectData();
  }

  get isDataLoaded() {
    return this.timetableData && this.registeredSubjectListData;
  }

  async getTimetableData() {
    this.timetableData = await this.hs.getTimetable(this.id);
  }

  async getSubjectData() {
    this.registeredSubject = await this.hs.getStudentSubjects(this.id);
    this.registeredSubjectListData = this.registeredSubject.map((subject) => {
      return {
        nama_subjek: subject.nama_subjek,
        kod_subjek: subject.kod_subjek,
        semester: subject.semester,
        sesi: subject.sesi,
        seksyen: subject.seksyen,
      };
    });
  }

  selectTab0() {
    this.viewMode = this.tabArray[0].name;
    if (this.tabArray[0].status == 1) {
      this.tabArray[1].status = 0;
    } else {
      this.tabArray[0].status = 1;
      this.tabArray[1].status = 0;
    }
  }
  selectTab1() {
    this.viewMode = this.tabArray[1].name;
    if (this.tabArray[1].status == 1) {
      this.tabArray[0].status = 0;
    } else {
      this.tabArray[1].status = 1;
      this.tabArray[0].status = 0;
    }
  }

  scroll(event: CustomEvent) {
    if (event.detail.velocityY > 0.2) {
      this.ge.scrollEvent.emit(false);
    } else if (event.detail.velocityY < -0.2) {
      this.ge.scrollEvent.emit(true);
    }
  }
}

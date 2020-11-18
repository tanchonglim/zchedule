import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LecturerHomePagePageRoutingModule } from "./lecturer-home-page-routing.module";

import { LecturerHomePagePage } from "./lecturer-home-page.page";
import { TeachingSubjectComponent } from "../components/teaching-subject/teaching-subject.component";
import { LecturerTimetableComponent } from "../components/lecturer-timetable/lecturer-timetable.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerHomePagePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    LecturerHomePagePage,
    TeachingSubjectComponent,
    LecturerTimetableComponent,
  ],
})
export class LecturerHomePagePageModule {}

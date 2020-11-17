import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StudentHomePagePageRoutingModule } from "./student-home-page-routing.module";

import { StudentHomePagePage } from "./student-home-page.page";
import { RegisteredSubjectsComponent } from "../components/registered-subjects/registered-subjects.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHomePagePageRoutingModule,
    SharedModule,
  ],
  declarations: [StudentHomePagePage, RegisteredSubjectsComponent],
})
export class StudentHomePagePageModule {}

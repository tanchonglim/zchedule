import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SubjectHomePageRoutingModule } from "./subject-home-routing.module";

import { SubjectHomePage } from "./subject-home.page";
import { SharedModule } from "src/app/shared/shared.module";
import { SubjectDetailComponent } from "../components/subject-detail/subject-detail.component";
import { SubjectInfoComponent } from "../components/subject-info/subject-info.component";
import { SubjectListComponent } from "../components/subject-list/subject-list.component";
import { SubjectStudentFreeTimeComponent } from "../components/subject-student-free-time/subject-student-free-time.component";

import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { SubjectChartComponent } from "./../components/subject-chart/subject-chart.component";
import { SubjectChartBarDetailComponent } from "../components/subject-chart-bar-detail/subject-chart-bar-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectHomePageRoutingModule,
    SharedModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [
    SubjectHomePage,
    SubjectDetailComponent,
    SubjectInfoComponent,
    SubjectListComponent,
    SubjectStudentFreeTimeComponent,
    SubjectChartComponent,
    SubjectChartBarDetailComponent,
  ],
})
export class SubjectHomePageModule {}

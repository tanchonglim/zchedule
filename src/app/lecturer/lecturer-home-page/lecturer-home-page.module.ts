import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LecturerHomePagePageRoutingModule } from "./lecturer-home-page-routing.module";

import { LecturerHomePagePage } from "./lecturer-home-page.page";
import { SharedModule } from "src/app/shared/shared.module";
import { LecturerDetailComponent } from "../components/lecturer-detail/lecturer-detail.component";
import { LecturerListComponent } from "../components/lecturer-list/lecturer-list.component";

import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { LecturerChartComponent } from "./../components/lecturer-chart/lecturer-chart.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerHomePagePageRoutingModule,
    SharedModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [
    LecturerHomePagePage,
    LecturerDetailComponent,
    LecturerListComponent,
    LecturerChartComponent,
  ],
})
export class LecturerHomePagePageModule {}

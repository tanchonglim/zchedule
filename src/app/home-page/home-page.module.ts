import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePagePageRoutingModule } from "./home-page-routing.module";

import { HomePagePage } from "./home-page.page";
import { SharedModule } from "../shared/shared.module";
import { Ng2GoogleChartsModule } from "ng2-google-charts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    SharedModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [HomePagePage],
})
export class HomePagePageModule {}

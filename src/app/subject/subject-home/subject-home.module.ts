import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SubjectHomePageRoutingModule } from "./subject-home-routing.module";

import { SubjectHomePage } from "./subject-home.page";
import { SharedModule } from "src/app/shared/shared.module";
import { SubjectDetailComponent } from "../components/subject-detail/subject-detail.component";
import { SubjectInfoComponent } from "../components/subject-info/subject-info.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectHomePageRoutingModule,
    SharedModule,
  ],
  declarations: [SubjectHomePage, SubjectDetailComponent, SubjectInfoComponent],
})
export class SubjectHomePageModule {}

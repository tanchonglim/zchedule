import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StudentHomePagePageRoutingModule } from "./student-home-page-routing.module";

import { StudentHomePagePage } from "./student-home-page.page";
import { SharedModule } from "src/app/shared/shared.module";
import { StudentDetailComponent } from "../components/student-detail/student-detail.component";
import { StudentListComponent } from "../components/student-list/student-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHomePagePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    StudentHomePagePage,
    StudentDetailComponent,
    StudentListComponent,
  ],
})
export class StudentHomePagePageModule {}

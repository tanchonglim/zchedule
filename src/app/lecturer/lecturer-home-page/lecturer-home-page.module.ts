import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LecturerHomePagePageRoutingModule } from "./lecturer-home-page-routing.module";

import { LecturerHomePagePage } from "./lecturer-home-page.page";
import { SharedModule } from "src/app/shared/shared.module";
import { LecturerDetailComponent } from "../components/lecturer-detail/lecturer-detail.component";
import { LecturerListComponent } from "../components/lecturer-list/lecturer-list.component";

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
    LecturerDetailComponent,
    LecturerListComponent,
  ],
})
export class LecturerHomePagePageModule {}

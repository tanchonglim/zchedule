import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RoomHomePageRoutingModule } from "./room-home-routing.module";

import { RoomHomePage } from "./room-home.page";
import { SharedModule } from "src/app/shared/shared.module";
import { RoomListComponent } from "../component/room-list/room-list.component";
import { RoomDetailComponent } from "../component/room-detail/room-detail.component";
import { RoomAvailabilityComponent } from "./../component/room-availability/room-availability.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomHomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    RoomHomePage,
    RoomListComponent,
    RoomDetailComponent,
    RoomAvailabilityComponent,
  ],
})
export class RoomHomePageModule {}

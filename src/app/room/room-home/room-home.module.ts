import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RoomHomePageRoutingModule } from "./room-home-routing.module";

import { RoomHomePage } from "./room-home.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomHomePageRoutingModule,
    SharedModule,
  ],
  declarations: [RoomHomePage],
})
export class RoomHomePageModule {}

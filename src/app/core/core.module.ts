import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from "@ionic/angular";
import { ErrorsHandlerModule } from "./errors-handler/errors-handler.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    // ErrorsHandlerModule,
  ],
  declarations: [],
})
export class CoreModule {}

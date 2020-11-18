import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TimetableSubjectsComponent } from "./components/timetable-subjects/timetable-subjects.component";
import { ModalHeaderComponent } from "./components/modal-header/modal-header.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [TimetableSubjectsComponent, ModalHeaderComponent],
  exports: [TimetableSubjectsComponent, ModalHeaderComponent],
})
export class SharedModule {}

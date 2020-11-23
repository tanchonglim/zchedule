import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TimetableSubjectsComponent } from "./components/timetable-subjects/timetable-subjects.component";
import { ModalHeaderComponent } from "./components/modal-header/modal-header.component";
import { SubjectListComponent } from "./components/subject-list/subject-list.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [
    TimetableSubjectsComponent,
    ModalHeaderComponent,
    SubjectListComponent,
  ],
  exports: [
    TimetableSubjectsComponent,
    ModalHeaderComponent,
    SubjectListComponent,
  ],
})
export class SharedModule {}

import { Injectable } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";
import { SubjectSection } from "../shared/models/SubjectSection";
import { Subject } from "./../shared/models/Subject";

@Injectable({
  providedIn: "root",
})
export class SubjectServiceService {
  constructor(private ds: DataServiceService) {}

  async getFilteredSubjects(searchString: string) {
    let subjectList: Array<Subject> = [];
    let filteredSubjectList: Array<Subject> = [];

    subjectList = await this.ds.getSubjectList();
    console.log(subjectList);
    filteredSubjectList = subjectList.filter((subject) => {
      return (
        subject.nama_subjek
          .toLowerCase()
          .trim()
          .includes(searchString.trim().toLowerCase()) ||
        subject.kod_subjek
          .toLowerCase()
          .trim()
          .includes(searchString.trim().toLowerCase())
      );
    });
    console.log(filteredSubjectList);

    return filteredSubjectList;
  }

  async getSubjectSections(subjectCode: string): Promise<SubjectSection> {
    let subjectSections = await this.ds.getSubjectSections();
    console.log(subjectSections);
    return subjectSections.filter(
      (section) => section.kod_subjek === subjectCode
    )[0];
  }
}

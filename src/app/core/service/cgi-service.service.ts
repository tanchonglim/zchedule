import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CgiServiceService {
  constructor() {}

  /**
   * return 1 if student, 2 if lecturer, 0 if nothing
   * @param id matrics/staff id
   */
  login(id: string) {
    //check with student/lecutrer subject
    //if student subject is empty array, return 0

    //then set current user id in data service
    return 1;
  }
}

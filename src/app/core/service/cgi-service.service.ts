import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataServiceService } from "./data-service.service";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { StudentSubject } from "./../../shared/interface/StudentSubject";

@Injectable({
  providedIn: "root",
})
export class CgiServiceService {
  apiEndpoint = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";

  constructor(private http: HttpClient) {}

  /**
   * return 1 if student, 2 if lecturer, 0 if nothing
   * @param id matrics/staff id
   */
  async getRole(id: string) {
    //check with student/lecutrer subject
    //if student subject is empty array, return 0

    //then set current user id in data service
    if ((await this.fetchStudentSubject(id)).length) {
      return 1;
    } else if ((await this.fetchLecturerSubject(id)).length > 1) {
      return 2;
    }

    return 0;
  }

  /**
   *
   * @param id matrik/staffid
   */
  async fetchStudentSubject(id: string): Promise<any> {
    let params: HttpParams = new HttpParams()
      .set("entity", "pelajar_subjek")
      .set("no_matrik", id);

    let result = await this.http
      .get(this.apiEndpoint, {
        params: params,
      })
      .toPromise();

    return result;
  }

  async fetchLecturerSubject(id: string): Promise<any> {
    let params: HttpParams = new HttpParams()
      .set("entity", "pensyarah_subjek")
      .set("no_pekerja", id);

    let result = await this.http
      .get(this.apiEndpoint, {
        params: params,
      })
      .toPromise();

    return result;
  }
}

import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import { Student } from "src/app/shared/models/Student";

@Injectable({
  providedIn: "root",
})
export class FsksmServiceService {
  apiEndpoint = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";

  admin = {
    login: "ad2021",
    password: "scsx3104",
  };

  constructor(private http: HttpClient) {}

  async fetchSesiSemester(): Promise<any> {
    let params: HttpParams = new HttpParams().set("entity", "sesisemester");

    let result = await this.http
      .get(this.apiEndpoint, {
        params: params,
      })
      .toPromise();

    return result;
  }

  async fetchStudentSubjects(no_matrik: string): Promise<any> {
    let params: HttpParams = new HttpParams()
      .set("entity", "pelajar_subjek")
      .set("no_matrik", no_matrik);

    let result = await this.http
      .get(this.apiEndpoint, {
        params: params,
      })
      .toPromise();

    return result;
  }

  async fetchLecturerSubjects(no_pekerja: string): Promise<any> {
    let params: HttpParams = new HttpParams()
      .set("entity", "pensyarah_subjek")
      .set("no_pekerja", no_pekerja);

    let result = await this.http
      .get(this.apiEndpoint, {
        params: params,
      })
      .toPromise();

    return result;
  }

  async fetchSubjectSchedule(
    sesi: string,
    semester: number,
    kod_subjek: string,
    seksyen: number
  ): Promise<any> {
    let params: HttpParams = new HttpParams()
      .set("entity", "jadual_subjek")
      .set("sesi", sesi)
      .set("semester", semester.toString())
      .set("kod_subjek", kod_subjek)
      .set("seksyen", seksyen.toString());

    let result = await this.http
      .get(this.apiEndpoint, {
        params: params,
      })
      .toPromise();

    return result;
  }

  //admin session_id
  async getAdminSessionID(): Promise<number> {
    let params = new HttpParams()
      .set("entity", "authentication")
      .set("login", this.admin.login)
      .set("password", this.admin.password);

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();
    return result[0].session_id;
  }

  //this requires admin credential
  async fetchStudentList(
    sessionid: number,
    sesi: string,
    semester: number,
    kod_kursus: string,
    limit: number,
    offset: number
  ): Promise<Array<Student>> {
    let params = new HttpParams()
      .set("entity", "pelajar")
      .set("session_id", sessionid.toString())
      .set("sesi", sesi)
      .set("semester", semester.toString())
      .set("kod_kursus", kod_kursus)
      .set("limit", limit.toString())
      .set("offset", offset.toString());

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    result.forEach((r) => {
      delete r["no_kp"];
    });

    return result;
  }
}

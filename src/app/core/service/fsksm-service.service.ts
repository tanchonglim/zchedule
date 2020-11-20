import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FsksmServiceService {
  apiEndpoint = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";

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

  async fetchStudentSubject(no_matrik: string): Promise<any> {
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

  async fetchLecturerSubject(no_pekerja: string): Promise<any> {
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

  //add more function
}

import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FsksmServiceService {
  apiEndpoint = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi";

  constructor(private http: HttpClient) {}

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

  /**
   *
   * @param id matrik/staffid
   */
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

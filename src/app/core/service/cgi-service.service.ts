import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataServiceService } from "./data-service.service";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CgiServiceService {
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

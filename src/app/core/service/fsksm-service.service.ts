import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import { Student } from "src/app/shared/models/Student";
import { Lecturer } from "src/app/shared/models/Lecturer";

@Injectable({
  providedIn: "root",
})
export class FsksmServiceService {
  apiEndpoint = "http://161.139.68.247/ttms/web_man_webservice_json.cgi";

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

  async fetchScheduleSubjects(
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

  //this requires admin credential
  async fetchStudents(
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

  async fetchLecturers(
    sessionid: number,
    sesi: string,
    semester: number
  ): Promise<Array<Lecturer>> {
    let params = new HttpParams()
      .set("entity", "pensyarah")
      .set("session_id", sessionid.toString())
      .set("sesi", sesi)
      .set("semester", semester.toString());

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    return result;
  }

  async fetchSubjects(sesi: string, semester: number) {
    let params = new HttpParams()
      .set("entity", "subjek")
      .set("sesi", sesi)
      .set("semester", semester.toString());

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    return result;
  }

  async fetchSubjectsSections(sesi: string, semester: number) {
    let params = new HttpParams()
      .set("entity", "subjek_seksyen")
      .set("sesi", sesi)
      .set("semester", semester.toString());

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    return result;
  }

  async fetchSubjectLecturer(
    kod_subjek: string,
    sesi: string,
    semester: number
  ) {
    let params = new HttpParams()
      .set("entity", "subjek_pensyarah")
      .set("sesi", sesi)
      .set("semester", semester.toString())
      .set("kod_subjek", kod_subjek);

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    return result;
  }

  async fetchSubjectStudent(
    sessionid: number,
    kod_subjek: string,
    seksyen: number,
    sesi: string,
    semester: number
  ) {
    let params = new HttpParams()
      .set("entity", "subjek_pelajar")
      .set("session_id", sessionid.toString())
      .set("sesi", sesi)
      .set("semester", semester.toString())
      .set("kod_subjek", kod_subjek)
      .set("seksyen", seksyen.toString());

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    result.forEach((r) => {
      delete r["no_kp"];
    });

    return result;
  }

  async fetchRooms() {
    let params = new HttpParams().set("entity", "ruang");

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    result = result.filter((r) => r.kod_fakulti == "FSKSM");
    return result;
  }

  async fetchRoomSchedule(kod_ruang: string, sesi: string, semester: number) {
    let params = new HttpParams()
      .set("entity", "jadual_ruang")
      .set("sesi", sesi)
      .set("semester", semester.toString())
      .set("kod_ruang", kod_ruang);

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();
    result = result.filter((r) => r.id_jws);

    return result;
  }
}

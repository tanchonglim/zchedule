import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "../../shared/models/Auth";

@Injectable({
  providedIn: "root",
})
export class GMMStudentService {
  // apiEndpoint = "http://161.139.68.245/~tcl2/";
  // apiEndpoint = "http://localhost/ad/";
  apiEndpoint = "http://161.139.68.247/ttms/web_man_webservice_json.cgi";

  constructor(private http: HttpClient) {}

  async getAdminSession() {
    let params = new HttpParams()
      .set("entity", "authentication")
      .set("login", "ad2021")
      .set("password", "scsx3104");
    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();
    result = result[0];
    return result;
  }

  async authentication(login: string, password: string): Promise<Auth> {
    let params = new HttpParams()
      .set("entity", "authentication")
      .set("login", login)
      .set("password", password);

    let result: any = await this.http
      .get(this.apiEndpoint, { params: params })
      .toPromise();

    //if is valid user
    if (result) {
      result = result[0];
      //if is admin
      if (result.login_name == "ad2021") {
        result.admin_session_id = result.session_id;
        result.role = "3";
      } else {
        //else get admin session
        let { session_id } = await this.getAdminSession();
        result.admin_session_id = session_id;

        if (result.login_name.match(/^\d/)) result.role = "2";
        //lecturer
        else result.role = "1"; //student
      }
    }

    return result;
  }
}

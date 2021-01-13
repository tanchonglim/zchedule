import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "src/app/shared/models/Auth";

@Injectable({
  providedIn: "root",
})
export class GMMStudentService {
  apiEndpoint = "http://161.139.68.245/~tcl2/";

  constructor(private http: HttpClient) {}

  async authentication(login: string, password: string): Promise<Auth> {
    let params = new HttpParams()
      .set("entity", "authentication")
      .set("login", login)
      .set("password", password);

    let result: any = await this.http
      .get(this.apiEndpoint + "auth.php", { params: params })
      .toPromise();
    return result;
  }
}

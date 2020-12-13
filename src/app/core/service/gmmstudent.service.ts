import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/shared/models/User";

@Injectable({
  providedIn: "root",
})
export class GMMStudentService {
  apiEndpoint = "http://gmm-student.fc.utm.my/~tcl2/";

  constructor(private http: HttpClient) {}

  async authentication(login: string, password: string): Promise<User> {
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

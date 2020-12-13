import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "../auth-service.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"],
})
export class LoginPagePage implements OnInit {
  login: string;
  password: string;
  constructor(private as: AuthServiceService) {}

  ngOnInit() {}

  async signin() {
    //validation

    let isLoggedIn = this.as.login(this.login, this.password);

    //if false, display mesessage

    //if currect, redirect to home
  }
}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"],
})
export class LoginPagePage implements OnInit {
  login: string;
  password: string;
  constructor() {}

  ngOnInit() {}

  async signin() {
    //validation
    //try login
    //if false, display mesessage
    //if currect, redirect to home
  }
}

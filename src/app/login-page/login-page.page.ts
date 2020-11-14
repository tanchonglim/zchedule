import { Component, OnInit } from "@angular/core";
import { CgiServiceService } from "../core/service/cgi-service.service";
import { DataServiceService } from "../core/service/data-service.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"],
})
export class LoginPagePage implements OnInit {
  constructor(
    private dataService: DataServiceService,
    private cgiService: CgiServiceService
  ) {}

  ngOnInit() {}

  login() {}
}

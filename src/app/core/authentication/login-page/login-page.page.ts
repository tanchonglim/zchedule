import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "../../service/data-service.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"],
})
export class LoginPagePage implements OnInit {
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {}

  login() {}
}

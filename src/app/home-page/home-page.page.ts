import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "../core/service/data-service.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.page.html",
  styleUrls: ["./home-page.page.scss"],
})
export class HomePagePage implements OnInit {
  constructor(private dataService: DataServiceService) {}

  async ngOnInit() {}
}

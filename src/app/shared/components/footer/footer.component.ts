import { Component, OnInit } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { DataServiceService } from "src/app/core/service/data-service.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  pages = [
    {
      title: "Home",
      url: "/home",
      icon: "home",
      supportOffline: true,
    },
    {
      title: "Lecturer",
      url: "/lecturer",
      icon: "ribbon",
      supportOffline: false,
    },
    {
      title: "Student",
      url: "/student",
      icon: "school",
      supportOffline: false,
    },
    {
      title: "Subject",
      url: "/subject",
      icon: "library",
      supportOffline: false,
    },
    {
      title: "Room",
      url: "/room",
      icon: "easel",
      supportOffline: false,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: "person-circle",
      supportOffline: true,
    },
  ];

  currentPage;

  constructor(
    private router: Router,
    public ds: DataServiceService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.currentPage = this.pages[0];
  }

  async select(page) {
    if (!page.supportOffline && this.ds.getOfflineMode()) {
      const toast = await this.toastController.create({
        message: "This feature does not support offline mode",
      });
      await toast.present();
      return;
    }
    this.currentPage = page;
    this.router.navigateByUrl(page.url);
  }

  isSelected(page) {
    return this.currentPage.url == page.url;
  }
}

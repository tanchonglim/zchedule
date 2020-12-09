import { Component, OnInit } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { NavController } from "@ionic/angular";

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
    },
    {
      title: "Lecturer",
      url: "/lecturer",
      icon: "ribbon",
    },
    {
      title: "Student",
      url: "/student",
      icon: "school",
    },
    {
      title: "Subject",
      url: "/subject",
      icon: "library",
    },
    {
      title: "Room",
      url: "/room",
      icon: "easel",
    },
    {
      title: "Profile",
      url: "/profile",
      icon: "person-circle",
    },
  ];

  currentPage;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentPage = this.pages[0];
    console.log();
  }

  select(page) {
    this.currentPage = page;
    this.router.navigateByUrl(page.url);
  }

  isSelected(page) {
    return this.currentPage.url == page.url;
  }
}

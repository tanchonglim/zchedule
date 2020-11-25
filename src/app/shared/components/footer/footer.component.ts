import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  pages = [
    {
      title: "Home",
      url: "/home-page",
      icon: "home",
    },
    {
      title: "Lecturer",
      url: "/lecturer-home-page",
      icon: "ribbon",
    },
    {
      title: "Student",
      url: "/student-home-page",
      icon: "school",
    },
    {
      title: "Subject",
      url: "/subject-home",
      icon: "library",
    },
    {
      title: "Room",
      url: "/room-home",
      icon: "easel",
    },
    {
      title: "Profile",
      url: "/",
      icon: "person-circle",
    },
  ];

  currentPage;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentPage = this.pages[0];
  }

  select(page) {
    this.currentPage = page;
    this.router.navigateByUrl(page.url);
  }

  isSelected(page) {
    return this.currentPage.url == page.url;
  }
}

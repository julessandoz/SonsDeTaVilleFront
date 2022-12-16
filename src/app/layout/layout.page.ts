import { Component } from "@angular/core";

// Custom type that represent a tab data.
type PageTab = {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: "app-layout",
  templateUrl: "layout.page.html",
  styleUrls: ["layout.page.scss"],
})
export class LayoutPage {
  tabs: PageTab[];

  constructor() {
    this.tabs = [
      { title: "Sounds Map", icon: "map", path: "sounds-map" },
      { title: "Record Sound", icon: "radio-button-on-outline", path: "record-sound" },
      { title: "Account", icon: "person-outline", path: "account" },
    ];
  }
}


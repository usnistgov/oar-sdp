import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu-bar',
  templateUrl: './top-menu-bar.component.html',
  styleUrls: ['./top-menu-bar.component.css']
})
export class TopMenuBarComponent implements OnInit {

  collapsed: boolean = true;
  keyDatasetsCollapsed: boolean = true;
  developerCollapsed: boolean = true;
  aboutCollapsed: boolean = true;
  aboutFindPapers: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  toggleKeyDatasets() {
    this.keyDatasetsCollapsed = !this.keyDatasetsCollapsed;
  }

  toggleDeveloper() {
    this.developerCollapsed = !this.developerCollapsed;
  }

  toggleAbout() {
    this.aboutCollapsed = !this.aboutCollapsed;
  }

  toggleFindPapers() {
    this.aboutFindPapers = !this.aboutFindPapers;
  }
}

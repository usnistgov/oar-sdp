import { Component, AfterViewInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import './operators';
import { SearchQueryService } from './shared/search-query/search-query.service';
import { GoogleAnalyticsService } from './shared/ga-service/google-analytics.service'
import { AppConfig, Config } from './shared/config-service/config-service.service';
import { concat } from 'rxjs';

enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
};

@Component({
  selector: 'sdp-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  layoutCompact: boolean = true;

  layoutMode: MenuOrientation = MenuOrientation.HORIZONTAL;


  darkMenu: boolean = false;

  profileMode: string = 'inline';

  rotateMenuButton: boolean;

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  layoutContainer: HTMLDivElement;

  layoutMenuScroller: HTMLDivElement;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  resetMenu: boolean;

  menuHoverActive: boolean;
  confValues: Config;
  gaCode: string;

  @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

  constructor(
    public renderer: Renderer,
    public searchQueryService: SearchQueryService,
    private appConfig: AppConfig,
    private gaService: GoogleAnalyticsService) {

    /**
     * Added Google Analytics service to html
     * 
     * Google Analytics service code was removed from index.html because it's not yet calling config service.
     * While adding Google Analytics service code here, the header menu and footer are all available 
     * at this time so we don't need to msnuslly track user events in header menu and footer links.
     * But we still need to track user event of the dynamic content.
     */
    this.confValues = this.appConfig.getConfig();
    this.gaCode = this.confValues.GACODE;
    this.gaService.appendGaTrackingCode(this.gaCode);
  }

  ngAfterViewInit() {
    this.layoutContainer = <HTMLDivElement>this.layourContainerViewChild.nativeElement;
  }

  ngOnInit() {

  }

  closeWindow() {
    // this.displayQueryList = false;
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.resetMenu = true;
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
    }

    if (!this.rightPanelClick) {
      this.rightPanelActive = false;
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightPanelClick = false;
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.rotateMenuButton = !this.rotateMenuButton;
    this.topbarMenuActive = false;

    if (this.layoutMode === MenuOrientation.OVERLAY) {
      this.overlayMenuActive = !this.overlayMenuActive;
    }
    else {
      if (this.isDesktop())
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      else
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
    }

    event.preventDefault();
  }

  onMenuClick($event) {
    this.menuClick = true;
    this.resetMenu = false;

    if (!this.isHorizontal()) {
      setTimeout(() => {
      }, 500);
    }
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item)
      this.activeTopbarItem = null;
    else
      this.activeTopbarItem = item;

    event.preventDefault();
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;
    event.preventDefault();
  }

  onRightPanelClick() {
    this.rightPanelClick = true;
  }

  hideOverlayMenu() {
    this.rotateMenuButton = false;
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  isTablet() {
    let width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.layoutMode === MenuOrientation.OVERLAY;
  }

  isHorizontal() {
    return this.layoutMode === MenuOrientation.HORIZONTAL;
  }

  isSlim() {
    return this.layoutMode === MenuOrientation.SLIM;
  }

  changeToStaticMenu() {
    this.layoutMode = MenuOrientation.STATIC;
  }

  changeToOverlayMenu() {
    this.layoutMode = MenuOrientation.OVERLAY;
  }

  changeToHorizontalMenu() {
    this.layoutMode = MenuOrientation.HORIZONTAL;
  }

  changeToSlimMenu() {
    this.layoutMode = MenuOrientation.SLIM;
  }

  ngOnDestroy() {
  }

}

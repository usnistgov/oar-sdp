import {Component,AfterViewInit,ElementRef,Renderer,ViewChild} from '@angular/core';
import './operators';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchQueryService } from './shared/search-query/search-query.service';
import { SearchEntity } from './shared/search-query/search.entity';

import {DataTableModule} from 'primeng/primeng';

enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
};

declare var jQuery: any;

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
  displayQueryList: boolean = false;
  searchEntities: SearchEntity[];

  @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

  constructor(public renderer: Renderer,public searchQueryService: SearchQueryService) {

    this.searchQueryService.watchQuery().subscribe(value => {
      this.displayQueryList = value;
    });
    this.getSearchQueryList();
  }

  ngAfterViewInit() {
    this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
    this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

    setTimeout(() => {
      // jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    }, 10);
  }


  removeItem(row:any) {
    let dataId: any;
    // convert the map to an array
    let delRow = this.searchEntities.indexOf(row);
    this.searchEntities.splice(delRow,1);
    this.searchQueryService.saveListOfSearchEntities(this.searchEntities);
    this.getSearchQueryList();
  }

  getSearchQueryList() {

    this.searchQueryService.getAllSearchEntities().then(function (result) {

      //console.log("result" + result.length);

      this.searchEntities = result;

      // console.log("cart entities inside datacartlist" + JSON.stringify(this.searchEntities));

    }.bind(this), function (err) {

      alert("something went wrong while fetching the products");

    });

  }

  closeWindow() {
    this.displayQueryList = false;
  }

  onLayoutClick() {
    if(!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if(!this.menuClick) {
      if(this.isHorizontal() || this.isSlim()) {
        this.resetMenu = true;
      }

      if(this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
    }

    if(!this.rightPanelClick) {
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

    if(this.layoutMode === MenuOrientation.OVERLAY) {
      this.overlayMenuActive = !this.overlayMenuActive;
    }
    else {
      if(this.isDesktop())
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      else
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
    }

    event.preventDefault();
  }

  onMenuClick($event) {
    this.menuClick = true;
    this.resetMenu = false;

    if(!this.isHorizontal()) {
      setTimeout(() => {
        // jQuery(this.layoutMenuScroller).nanoScroller();
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

    if(this.activeTopbarItem === item)
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
    // jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
  }

}

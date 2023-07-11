import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import './operators';
import { SearchQueryService } from './shared/search-query/search-query.service';
import { GoogleAnalyticsService } from './shared/ga-service/google-analytics.service'
import { AppConfig, Config } from './shared/config-service/config.service';
import { concat } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { DOCUMENT } from '@angular/common';

enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
};

declare const gtag: Function;

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
  gaCode: string = null;
  ga4Code: string = null;

  @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

  constructor(
    public renderer: Renderer2,
    public searchQueryService: SearchQueryService,
    private appConfig: AppConfig,
    private gaService: GoogleAnalyticsService,
    public router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document) {
        
  }

    ngAfterViewInit() {
        this.layoutContainer = <HTMLDivElement>this.layourContainerViewChild.nativeElement;
    }

    ngOnInit() {
        this.appConfig.getConfig().subscribe(
            (conf) => {
                this.gaCode = conf.GACODE;
                this.ga4Code = conf.GA4CODE;

                /**
                 * Added Google Analytics service to html
                 * 
                 * Google Analytics service code was removed from index.html because 
                 * it's not yet calling config service.  While adding Google Analytics 
                 * service code here, the header menu and footer are all available 
                 * at this time so we don't need to msnuslly track user events in header 
                 * menu and footer links.  But we still need to track user event of the 
                 * dynamic content.
                 */
                this.gaService.appendGaTrackingCode(this.gaCode, this.ga4Code);

                //Add GA4 code to track page view
                this.handleRouteEvents();
            }
        );
    }

    /**
     * GA4 code to track page view when user navigates to different pages
     */
    handleRouteEvents() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log('event', event);
                const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
                console.log('title', title);
                this.titleService.setTitle(title);
                gtag('event', 'page_view', {
                    page_title: title,
                    page_path: event.urlAfterRedirects,
                    page_location: this.document.location.href
                })
            }
        });
    }
    
    /**
     * Get page title if any
     * @param state router state
     * @param parent Activated route
     * @returns 
     */
    getTitle(state: RouterState, parent: ActivatedRoute): string[] {
        const data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
            data.push(parent.snapshot.data['title']);
        }
        if (state && parent && parent.firstChild) {
            data.push(...this.getTitle(state, parent.firstChild));
        }
        return data;
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

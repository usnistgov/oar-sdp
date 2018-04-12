// landing.po.ts
import { browser, element, by } from 'protractor';

export class LandingPage {
  navigateTo() {
    // Navigate to the home page of the app
    return browser.get('/#/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
  }

  getlandingDivElements() {

    return element.all(by.css('div'));
  }
  getlandingTitle(){
    return element.all(by.css('h2'));
  }
}
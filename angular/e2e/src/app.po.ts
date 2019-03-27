import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(pageRoute) {
    return browser.get(pageRoute);
  }

  getParagraphText() {
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    return element(by.className('TexAlCenter title')).getText();
  }
}

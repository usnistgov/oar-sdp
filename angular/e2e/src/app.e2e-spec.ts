import { AppPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Home page should have a title and title should be NIST Data Discovery', async () => {
    page.navigateTo('/');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect(browser.getTitle()).toEqual('NIST Data Repository Page');

    expect(page.getParagraphText()).toEqual('NIST Data Discovery');
  });

  it('About page should display title of about page', () => {
    page.navigateTo('/#/about');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect(element(by.id('title')).getText()).toEqual('About NIST Data');
  });

  it('Advanced search page should display title of advanced search page', () => {
    page.navigateTo('/#/advanced');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect(element(by.id('title')).getText()).toEqual('Advanced Search Builder');
  });

  it('Policy page should display title of policy', () => {
    page.navigateTo('/#/policy');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect(element(by.id('title')).getText()).toEqual('Policy');
  });

  it('Help page should display title of help', () => {
    page.navigateTo('/#/help');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect(element(by.id('title')).getText()).toEqual('Help');
  });

  it('Api page should display title of api page', () => {
    page.navigateTo('/#/api');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect(element(by.id('title')).getText()).toEqual('APIs');
  });

  it('Search page should display title of search page', () => {
    page.navigateTo('/#/search?q="SRD 69"&key=&queryAdvSearch=');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    const text = element(by.css('sdp-search h4')).getText();
    expect(text).toContain("SRD 69");
  });

});

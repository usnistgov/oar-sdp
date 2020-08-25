import {Injectable, Injector} from '@angular/core';
import { AppPage } from './app.po';
import { browser, element, by } from 'protractor';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

  });

  it('Home page should have a title and title should be NIST Data Discovery', async () => {
    page.navigateTo('/');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect<any>(browser.getTitle()).toEqual('NIST Data Repository Page');
    expect<any>(page.getParagraphText()).toEqual('NIST Data Discovery');
    expect<any>(element(by.id('feature')).getText()).toEqual('FEATURED DATA DOMAINS');
  });

  it('About page should display title of about page', () => {
    page.navigateTo('/#/about');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect<any>(element(by.id('title')).getText()).toEqual('About NIST Data');
  });

  it('Advanced search page should display title of Advanced Search Builder', () => {
    page.navigateTo('/#/advanced');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect<any>(element(by.id('title')).getText()).toEqual('Advanced Search Builder');
  });

  it('Policy page should display title of policy', () => {
    page.navigateTo('/#/policy');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect<any>(element(by.id('title')).getText()).toEqual('Policy');
  });

  it('Help page should display title of help', () => {
    page.navigateTo('/#/help');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect<any>(element(by.id('title')).getText()).toEqual('Help');
  });

  it('Api page should display title of api page', () => {
    page.navigateTo('/#/api');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    expect<any>(element(by.id('title')).getText()).toEqual('APIs');
  });

  it('Search for text SRD 69 should return SRD 101 (mock data)', () => {
    page.navigateTo('/#/search?q="SRD 69"&key=&queryAdvSearch=');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    const text = element(by.css('sdp-search h4')).getText();
    expect<any>(text).toContain("SRD 101");
  });

  it('Search for text SRD 101 should return SRD 101',()=>{
    page.navigateTo('/');
    browser.sleep(5000);
    browser.ignoreSynchronization = true;
    page.showExampleLink().click();
    browser.sleep(5000);
    page.getSearchExampleLink().click();
    browser.sleep(5000);
    page.getSearchButton().click();
    browser.sleep(5000);

    const text = element(by.css('sdp-search h4')).getText();
    expect<any>(text).toContain("SRD 101");
  });
});

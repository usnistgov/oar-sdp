import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';

describe('Landing Page', function() {

  it('Should redirect to /noid page', function() {
    // expect(true).toBe(true);
    browser.get('#/id');
    browser.waitForAngular();
    expect<any>(browser.getCurrentUrl()).toEqual('/noid');
  });

  it('Check if there is any data if not display no data message', function() {
    browser.get('#/id/D3B8CE0531A570681DB5D');
    browser.waitForAngular();
    var EC = protractor.ExpectedConditions;
    var label = element.all(by.css('.labelStyle'));
    expect(label.get(0).getText()).toContain('About Public Data Repository');
   });

  it('should check contents of the P field', function() {
    browser.get('#/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
    browser.waitForAngular();
    var EC = protractor.ExpectedConditions;
    var list = element.all(by.css('h2'));
    expect(list.get(0).getText()).toContain('OptSortSph: Sorting Spherical Dielectric Particles in a Standing-Wave Interference Field');
  });

});
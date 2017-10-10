import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';

describe('App Page', function() {

  it('should automatically redirect to /home the first time', function() {
    // expect(true).toBe(true);
    browser.get('/');
    browser.waitForAngular();
    expect<any>(browser.getCurrentUrl()).toEqual('/about');
  });

  it('should display title of about page', function() {
    browser.get('#/about');
    browser.waitForAngular();
    var EC = protractor.ExpectedConditions;
    // var label = element.all(by.css('.labelStyle'));
    
    // expect(label.get(0).getText()).toContain('About Public Data Repository');
   });

  it('should check contents of the P field', function() {
    browser.get('#/home');
    browser.waitForAngular();
    // var EC = protractor.ExpectedConditions;
    // var list = element.all(by.css('p'));
    
  });

});
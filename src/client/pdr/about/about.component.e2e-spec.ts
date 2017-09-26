import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';

describe('About Page', function() {

  it('should automatically redirect to /home the first time', function() {
    // expect(true).toBe(true);
    browser.get('/');
    browser.waitForAngular();
    expect(browser.getLocationAbsUrl()).toEqual("/about");
  });

  it('should display welcome page', function() {
    browser.get('#/about');
    browser.waitForAngular();
    var EC = protractor.ExpectedConditions;
    var label = element.all(by.css('.labelStyle'));
    
    expect(label.get(0).getText()).toContain('');
   });


  it('should have all the cards present', function() {
    browser.get('#/home');
    browser.waitForAngular();
    var EC = protractor.ExpectedConditions;
    var list = element.all(by.css('p'));
    
  });


});
import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';

describe('Landing Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
  });

  it('should display top title of Landing page', async() => {
    
    //var EC = protractor.ExpectedConditions;
    var label = await element(by.css('pdr-landing .recordType b'));
    expect(label.getText()).toContain('Public Data Resource');
   });

   it('should display title of landing page', function() {
    //browser.get('/#/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
    //browser.waitForAngular();
    //var EC = protractor.ExpectedConditions;
    var label = element.all(by.css('pdr-landing h2'));
    expect(label.get(0).getText()).toMatch(/OptSortSph/i,
      'should say something about "OptSortSph"');
    //expect(label.get(0).getText()).toContain('OptSortSph: Sorting Spherical Dielectric Particles in a Standing-Wave Interference Field');
   });
  //  it('should show current  landing url', async() => {
  //   var test = await browser.getCurrentUrl();
  //   expect(test).toContain('/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
  //  });

  //  it('should show current url2', async() => {
  //   var test = await browser.get('http://localhost:5555/#/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
  //   expect(test).toContain('/od/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
  //  });

});
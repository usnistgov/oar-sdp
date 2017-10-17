import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';

describe('Nerdm Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/nerdm');
  });

  it('should display title of about page', async() => {
    
    var EC = protractor.ExpectedConditions;
    var label = await element(by.css('nerdm-detail h2'));
    
    expect(label.getText()).toContain('TEST NERDM TITLE');
   });

});
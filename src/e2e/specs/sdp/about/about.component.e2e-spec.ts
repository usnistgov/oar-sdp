import { browser, by, element } from 'protractor';

describe('About Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/about');
  });

  it('should display title of about page', async() => {
    browser.sleep(5000);
    var label = await element(by.css('sdp-about label'));
    expect(label.getText()).toContain('About NIST Data');
  });

});

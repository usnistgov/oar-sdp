import { browser, by, element } from 'protractor';

describe('About Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/about');
  });

  it('should display title of about page', async() => {
    browser.sleep(2000);
    var label = await element(by.css('sdp-about label')).getText();
    expect(label).toEqual('About NIST Data');
  }, 4000);

});

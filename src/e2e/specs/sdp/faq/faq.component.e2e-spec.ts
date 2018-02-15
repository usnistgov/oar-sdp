import { browser, by, element } from 'protractor';

describe('FAQ Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/faq');
  });

  it('should display title of faq page', async() => {
    browser.sleep(1000);
    var label = await element(by.css('sdp-faq label')).getText();
    expect(label).toEqual('FAQ');
  });

});

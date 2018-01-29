import { browser, by, element } from 'protractor';

describe('API Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/api');
  });

  it('should display title of api page', async() => {
    browser.sleep(1000);
    var label = await element(by.css('sdp-api label')).getText();
    expect(label).toEqual('APIs');
  });

});

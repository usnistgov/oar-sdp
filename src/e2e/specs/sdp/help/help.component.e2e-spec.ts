import { browser, by, element } from 'protractor';

describe('Help Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/help');
  });

  it('should display title of help page', async() => {
    browser.sleep(1000);
    var label = await element(by.css('sdp-help label')).getText();
    expect(label).toEqual('Help');
  });

});

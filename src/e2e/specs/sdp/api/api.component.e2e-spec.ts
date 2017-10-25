import { browser, by, element } from 'protractor';

describe('API Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/api');
  });

  it('should display title of api page', async() => {

    var label = await element(by.css('sdp-api label'));
    expect(label.getText()).toContain('APIs');
  });

});

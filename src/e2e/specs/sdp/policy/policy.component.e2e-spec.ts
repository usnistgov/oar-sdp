import { browser, by, element } from 'protractor';

describe('Policy Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/policy');
  });

  it('should display title of policy page', async() => {
    browser.sleep(1000);
    var label = await element(by.css('sdp-policy label')).getText();
    expect(label).toEqual('Policy');
  }, 4000);

});
